// pages/api/bookmark.js
import { pool } from '../../db';
import withSession from '../../middleware/_middleware';

export default withSession(async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        const { id } = req.body;
        const session = req.session.get('user');

        if (session) {
            const { email } = session;
            const client = await pool.connect();
            const result = await client.query('INSERT INTO tbl_bookmarks (user_email, recipe_id) VALUES ($1, $2) RETURNING *', [email, id]);
            const insertedUser = result.rows[0];
            client.release();

          } else {
            return res.status(401).json({ message: 'No email found in session' });
          }

        res.status(200).json();
    } catch (error) {
      console.error('Error saving recipe', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
});

