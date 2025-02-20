import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { env } from "../env"
import { accessInviteLink } from "../functions/access-invite-link"
import { redis } from "../redis/client"

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    "/invites/:subscriberId",
    {
      schema: {
        summary: "Access invite link and redirect user",
        tags: ["referral"],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, replay) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      console.log(await redis.hgetall("referral:access-count"))

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set("referrer", subscriberId)

      return replay.redirect(redirectUrl.toString(), 302)
    }
  )
}
