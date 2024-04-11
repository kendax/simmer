// pages/api/logout.js
import withSession from '../../middleware/_middleware';

export default withSession(async function logoutHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
    req.session.destroy();
    const redirectUrl = '../login';
    // Send the redirect URL in the response
    res.status(200).json({ redirectUrl });
});
