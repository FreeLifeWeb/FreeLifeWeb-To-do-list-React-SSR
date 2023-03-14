const isDeletePatch = (req, res, next) => {
  if (req.session?.user?.id !== +req.params.userId) {
    console.log('ppppppppp', req.session?.user?.id);
    console.log('999999999', +req.params.userId);
    return res.status(401).json({ message: 'Не ты делал, не ты и удаляешь 😎!' });
  }
  next();
};

export default isDeletePatch;
