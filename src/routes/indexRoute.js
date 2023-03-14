import express from 'express';
import { ToDo } from '../../db/models';
import isAuth from '../midleware/isAuth';

const getRoute = express.Router();

getRoute.get('/', isAuth, async (req, res) => {
  const allPosts = await ToDo.findAll();
  // console.log(allPosts);
  const initState = { allPosts };
  res.render('Layout', initState);
});

getRoute.get('/reg', (req, res) => {
  res.render('Layout');
});

getRoute.get('/auth', (req, res) => {
  res.render('Layout');
});

export default getRoute;
