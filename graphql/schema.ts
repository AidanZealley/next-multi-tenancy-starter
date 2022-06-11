import { asNexusMethod, makeSchema, connectionPlugin } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { join } from 'path'
import * as types from 'graphql/types'

const DateTime = asNexusMethod(DateTimeResolver, 'dateTime')

export const schema = makeSchema({
  types: [...Object.entries(types), DateTime],
  plugins: [connectionPlugin()],
  outputs: {
    typegen: join(process.cwd(), 'graphql', 'generated', 'types.ts'),
    schema: join(process.cwd(), 'graphql', 'schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.ts'),
  },
})
