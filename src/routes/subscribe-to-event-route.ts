import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { subscribeToEvent } from "../functions/subscribe-to-event"

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
          referrer: z.string().nullish(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, replay) => {
      const { name, email, referrer } = request.body

      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId: referrer,
      })

      return replay.status(200).send({
        subscriberId,
      })
    }
  )
}
