import { validate } from '../services/userService.js';

export const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await validate(email, senha);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}