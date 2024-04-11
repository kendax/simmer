// pages/api/loggingin.js
import bcrypt from 'bcrypt';
import { pool } from '../../db';
import withSession from '../../middleware/_middleware';

export default withSession(async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const client = await pool.connect();

  try {
    const query = 'SELECT * FROM tbl_user WHERE email = $1';
    const result = await client.query(query, [email]);
    const user = result.rows[0];

    if (!user) {
        throw new Error('Login failed');
    }
    
    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

    // Construct the redirect URL
    const redirectUrl = '../dashboard';

     // Store user information in session
     req.session.set('user', { email });
     await req.session.save();
    
    // Send the redirect URL in the response
    res.status(200).json({ redirectUrl });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release(); // Release the client back to the pool
  }
});