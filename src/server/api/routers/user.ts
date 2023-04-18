import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "y/server/api/trpc";
import { endpoints } from "../endpoins";
import axios from "axios";

export const userRouter = createTRPCRouter({
  addFriend: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { data } = await axios.post(endpoints.user.addFriend, {
          email: input.email,
        });
        console.log(data, "from trpc");
        return;
      } catch (error) {
        console.log(error);
      }
    }),
});
