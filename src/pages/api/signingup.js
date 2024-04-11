// pages/api/signingup.js
import bcrypt from 'bcrypt';
import { pool } from '../../db';
import withSession from '../../middleware/_middleware';

export default withSession(async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, email, password } = req.body;
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

      const client = await pool.connect();
      const result = await client.query('INSERT INTO tbl_user (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
      const insertedUser = result.rows[0];
      client.release();
      // Construct the redirect URL
      const redirectUrl = '../dashboard';

      // Store user information in session
      req.session.set('user', { email });
      await req.session.save();

      // Send the redirect URL in the response
      res.status(200).json({ redirectUrl });
    } catch (error) {
      console.error('Error adding user', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
});

