import express from 'express';
import { ToDo } from '../../db/models';
import isDeletePatch from '../midleware/isDeletePatch';

const apiRoute = express.Router();

apiRoute.post('/new/:userId', async (req, res) => {
  try {
    // console.log(req.body);
    const { userId } = req.params;
    console.log('8888888888', userId);
    const post = await ToDo.create({ ...req.body, userId });
    console.log(post);
    res.json(post);
  } catch {
    res.sendStatus(500);
  }
});

apiRoute.delete('/delete/:id/:userId', isDeletePatch, async (req, res) => {
  try {
    await ToDo.destroy({ where: { id: req.params.id } });
    // console.log(post);
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

apiRoute.patch('/edit/:id/:userId', isDeletePatch, async (req, res) => {
  try {
    const todo = await ToDo.findOne({ where: { id: req.params.id } });
    // console.log(todo);
    const { input } = req.body;
    // console.log(req.body);
    todo.title = input;
    todo.save();
    res.json(todo);
  } catch {
    res.sendStatus(500);
  }
});

apiRoute.post('/status/:id', async (req, res) => {
  try {
    const todo = await ToDo.findOne({ where: { id: req.params.id } });
    // console.log('---------', todo);
    todo.status = !todo.status;
    todo.save();
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

apiRoute.get('/oneCard/:id', async (req, res) => {
  try {
    const Onetodo = await ToDo.findOne({ where: { id: req.params.id } });
    console.log('---------', req.params.id);
    const initState = { Onetodo };
    res.render('Layout', initState);
  } catch {
    res.sendStatus(500);
  }
});
export default apiRoute;
