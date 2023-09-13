import express, { Router as ExpressRouter } from "express";
import cors from "cors";
import * as trpcExpressAdpater from "@trpc/server/adapters/express";
import path from "path";
import { todosRouter } from "./routes";
import { router, createContext } from "./trpc";

const expressRouter = ExpressRouter();

const app = express();

const appRouter = router({
    todo: todosRouter,
});

app.use(cors());

app.use('/trpc',
    trpcExpressAdpater.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
)


app.use(expressRouter);

app.use(express.static(path.join(__dirname, "../trpc-client/dist")));


export type AppRouter = typeof appRouter;

export default app;
