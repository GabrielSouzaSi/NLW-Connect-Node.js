import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    "/subscriptions",
    {
      schema: {
        summary: "Subscribe someone to the event",
        tags: ["Subscribe"],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string(),
          }),
        },
      },
    },
    async (request, replay) => {
      const { name, email } = request.body

      return replay.status(200).send({
        name,
        email,
      })
    }
  )
}
