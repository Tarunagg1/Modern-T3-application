import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const notesRouter = createTRPCRouter({
    getAll: protectedProcedure
        .input(z.object({ topicId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.notes.findMany({
                where: {
                    topicId: input.topicId
                }
            })
        }),

    createNote: protectedProcedure.input(z.object({
        title: z.string(),
        content: z.string(),
        topicId: z.string()
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.topic.create({
            data: {
                title:input.title,
                content: input.content,
                topicId: input.topicId
            }
        })
    })
});
