import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from '../config/auth';
import Users from '../models/user';

const opts = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export default () => {
  const strategy = new Strategy(opts, async (payload, done) => {
    try {
      let user = await Users.findOne({ where: payload.id });
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  });
  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', config.session),
  };
};
