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
      resolve: async (e, args, ctx) => {
        const user = ctx.reply.request.user;
        if (!user?.id) return null;

        const [currentUser] = await ctx.app.db<NexusGenRootTypes['User']>('users')
          .where('id', user.id)
          .select();

        return currentUser;
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
        email: stringArg(),
      },
      resolve: async (_, { userId, email }, ctx) => {
        const user = ctx.reply.request.user;
        if (!user?.id || userId !== user.id) return null;

        // return await prisma.user.update({
        //   where: { id: userId },
        //   data: { name },
        // });
        await ctx.app.db<NexusGenRootTypes['User']>('users')
          .where('id', userId)
          .update('email', email);
        return {};
      },
    });
  },
});

export default [User, mutations, queries];
