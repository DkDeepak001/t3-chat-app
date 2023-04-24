import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "y/server/api/trpc";

export const userRouter = createTRPCRouter({
  addFriend: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      try {
      } catch (error) {
        console.log(error);
      }
    }),
});
