import path from 'path';
import { makeSchema } from 'nexus';
import User from './users';
import App, { PaidPlan } from './apps';

// Only generate in development or when the yarn run generate:nexus command is run
// This fixes deployment on Netlify, otherwise you'll run into an EROFS error during building
const shouldGenerateArtifacts = process.env.NODE_ENV === 'development' || !!process.env.GENERATE;

export const schema = makeSchema({
  types: [User],
  // Type the GraphQL context when used in Nexus resolvers
  contextType: {
    module: 'mercurius',
    export: 'MercuriusContext',
  },
  // Generate the files
  shouldGenerateArtifacts,
  outputs: {
    typegen: path.join(__dirname, 'nexus-types.generated.ts'),
    schema: path.join(__dirname, 'schema.graphql'),
  },
});
