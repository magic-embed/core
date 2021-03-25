import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { NexusGenRootTypes } from 'src/graphql/nexus-types.generated';

const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id');
    t.string('email');
  },
});

const queries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('currentUser', {
      type: 'User',
      resolve: (_, __, ctx) => {
        // if (!ctx.user?.id) return null;

        // return prisma.user.findUnique({
        //   where: {
        //     id: ctx.user.id,
        //   },
        // });
        const getFirstUser = (db: any) => db.table('users').first();
        return ctx.app.db().modify<NexusGenRootTypes['User']>(getFirstUser);
      },
    });
  },
});

const mutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.nullable.field('updateUser', {
      type: 'User',
      args: {
        userId: nonNull(stringArg()),
        name: stringArg(),
      },
      resolve: async (_, { userId, name }, ctx) => {
        // if (!ctx.user?.id || userId !== ctx.user.id) return null;

        // return await prisma.user.update({
        //   where: { id: userId },
        //   data: { name },
        // });
        return {};
      },
    });
  },
});

export default [User, mutations, queries];
