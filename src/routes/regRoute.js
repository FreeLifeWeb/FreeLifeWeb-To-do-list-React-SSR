import express from 'express';
import { hash, compare } from 'bcrypt';
import { User } from '../../db/models';

const regRouter = express.Router();

regRouter.post('/auth', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) return res.sendStatus(400);

  const user = await User.findOne({ where: { name } });

  if (!user) return res.sendStatus(400);

  const isPassValid = compare(password, user.password);

  if (!isPassValid) return res.sendStatus(400);

  req.session.user = { id: user.id, email: user.email };
  // console.log(req.session.user);

  return res.sendStatus(200);
});

regRouter.post('/reg', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.sendStatus(400);

  const hashPassword = await hash(password, 10);

  const [user, isCreated] = await User.findOrCreate({
    where: { email },
    defaults: { name, email, password: hashPassword },
  });

  if (!isCreated) return res.sendStatus(400);

  req.session.user = { id: user.id, email: user.email };

  res.sendStatus(200);
});

regRouter.get('/logout', (req, res) => {
  res.clearCookie('user_sid'); // Удалить куку
  req.session.destroy(); // Завершить сессию
  res.redirect('/reg');
});

export default regRouter;
