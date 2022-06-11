import { createClient, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'

const client = createClient({
  url: 'http://localhost:3000/api/graphql',
  exchanges: [dedupExchange, cacheExchange({}), fetchExchange],
})
