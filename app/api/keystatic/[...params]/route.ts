import { makeRouteHandler } from '@keystatic/next/route-handler'
import config from '../../../../keystatic.config'

// clientId/clientSecret are required by Keystatic's validator even though we
// bypass OAuth entirely by pre-injecting the PAT as keystatic-gh-access-token.
export const { GET, POST } = makeRouteHandler({
  config,
  clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID ?? 'unused',
  clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ?? 'unused',
})
