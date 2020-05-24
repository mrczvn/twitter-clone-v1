import 'dotenv/config';

export default {
  secret: process.env.APP_SECRET,
  session: { session: false },
};
