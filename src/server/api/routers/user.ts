import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "y/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  addFriend: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const isUser = await ctx.prisma.user.findUnique({
          where: { email: input.email },
        });

        if (!isUser) {
          return new TRPCError({
            message: "user not found",
            code: "FORBIDDEN",
          });
        }

        if (ctx.session?.user.email === input.email)
          return new TRPCError({
            message: "You cannout add you as frient",
            code: "FORBIDDEN",
          });

        return await ctx.prisma.incommingRequest.create({
          data: {
            incomming: { connect: { id: ctx.session?.user.id } },
            ownerID: isUser.id,
          },
        });
      } catch (error) {
        console.log("TRPCError", error);
      }
    }),

  getRequest: publicProcedure.query(async ({ ctx }) => {
    const getAllRequest = await ctx.prisma.incommingRequest.findMany({
      where: { ownerID: "6447f05c20a44833c063b185" },
      include: { incomming: true },
    });
    console.log(getAllRequest);
    return getAllRequest;
  }),
});
