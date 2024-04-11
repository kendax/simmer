// pages/api/_middleware.js
import { withIronSession } from 'next-iron-session';

export default function withSession(handler) {
  return withIronSession(handler, {
    password: 'prerenderedasstaticcontentserverrenderedondemandusingnodejs',
    cookieName: 'simmer',
    cookieOptions: {
      secure: false,
    },
  });
}
