const routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to my API');
  });
};
export default routes;
