import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "y/server/api/trpc";

export const userRouter = createTRPCRouter({
  addFriend: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const isUser = await ctx.prisma.user.findUnique({
          where: { email: input.email },
        });

        console.log(isUser);
        if (!isUser) {
          return new Error("user not found");
        }

        if (ctx.session?.user.email === input.email) {
          return new Error("YOu cannot add yourself as friend");
        }
        return await ctx.prisma.request.create({
          data: {
            From: { connect: { id: ctx.session?.user.id } },
            To: { connect: { email: input.email } },
          },
        });
      } catch (error) {
        console.log("TRPCError", error);
      }
    }),

  getRequest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.request.findMany({
      where: { to: ctx.session?.user.id },
      select: {
        id: true,
        From: { select: { name: true, email: true, image: true } },
      },
    });
  }),

  cancelReq: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.request.delete({
          where: { id: input.id },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
