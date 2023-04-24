import { createTRPCRouter } from "y/server/api/trpc";
import { exampleRouter } from "y/server/api/routers/example";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  user: userRouter,
});

sssexport type AppRouter = typeof appRouter;
