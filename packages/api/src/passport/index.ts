import fp from 'fastify-plugin';
import passport from 'fastify-passport';
import fastifySecureSession from 'fastify-secure-session';
import { magicLink } from './magic-link';
import STRATEGY from './strategy';

const COOKIE_SECRET = process.env.COOKIE_SECRET as string;

export const passportSetup = fp(async (instance) => {
  instance.register(fastifySecureSession, {
    key: Buffer.from(COOKIE_SECRET, 'hex'),
    cookieName: 'session',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 * 30,
      // Do not change the lines below, they make cy.auth() work in e2e tests
      secure: process.env.NODE_ENV !== 'development' && !process.env.INSECURE_AUTH,
      signed: process.env.NODE_ENV !== 'development' && !process.env.INSECURE_AUTH,
    },
  });
  instance.register(passport.initialize());
  instance.register(passport.secureSession());

  passport.registerUserSerializer(async (passportUser: { email: string }) => {
    const { email } = passportUser;
    await instance
      .db('users')
      .insert({
        email,
        confirmed_at: new Date(),
      })
      .onConflict('email')
      .ignore();

    const [user] = await instance
      .db<{ id: string, email: string }>('users')
      .where('email', email)
      .select('id');

    return user.id;
  });

  passport.registerUserDeserializer(async (userId: string) => {
    const [user] = await instance.db('users').where('id', userId);
    return user;
  });
  passport.use(STRATEGY, magicLink);
});
