import { asNexusMethod, makeSchema, connectionPlugin } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { join } from 'path'
import * as types from '@/graphql/types'

const DateTime = asNexusMethod(DateTimeResolver, 'dateTime')

export const schema = makeSchema({
  types: [...Object.entries(types), DateTime],
  plugins: [connectionPlugin()],
  outputs: {
    typegen: join(process.cwd(), 'src', 'graphql', 'generated', 'nexus.d.ts'),
    schema: join(process.cwd(), 'src', 'graphql', 'schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'src', 'graphql', 'context.ts'),
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
