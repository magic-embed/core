import { FastifyInstance } from 'fastify';
import passport from 'fastify-passport';
import fastifySecureSession from 'fastify-secure-session';
import { magicLink } from './magic-link';

const COOKIE_SECRET = process.env.COOKIE_SECRET as string;

export async function passportSetup(instance: FastifyInstance) {
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
  passport.use('magicLink', magicLink);

  passport.registerUserSerializer(async (passportUser: { email: string }) => {
    const { email } = passportUser;
    await instance
      .db('users')
      .insert({
        email,
        confirmedAt: new Date(),
      })
      .onConflict('email')
      .ignore();

    const [user] = await instance
      .db<{ id: string }>('users')
      .select('id')
      .where('email = ?', email);

    return user.id;
  });

  passport.registerUserDeserializer(async (passportUser) => {
    return passportUser;
  });
}
