import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "y/server/api/trpc";

export const userRouter = createTRPCRouter({
  addFriend: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("gi");
      } catch (error) {
        console.log(error);
      }
    }),
});
