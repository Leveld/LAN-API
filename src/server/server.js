const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { throwError, asyncMiddleware, apiServerIP } = require('capstone-utils');
const { getUserMiddleware } = require('./controllers/users');
const routes = require('./routes');

const PORT = process.env.PORT || '3001';

const app = express();

app.use(cors({
  allowedHeaders:['Content-Type', 'Authorization'],
  credentials: true,
  origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const getTokenAndUser = async (req, res, next) => {
  req.authToken = req.header('Authorization') ? req.header('Authorization').split('Bearer ').splice(0).join(' ').trim() : null;
  console.log(req.authToken);
  if (req.authToken === null)
    throwError('APIAuthenticationError', 'Missing Authorization Token', 403);
  try {
    //const user = await axios.get(`${apiServerIP}user`, { headers: { Authorization: `Bearer ${req.authToken}`}, withCredentials: true });
    const user = await getUserMiddleware(req, res, next);
    if (user)
      req.authedUser = user;
  } catch (error) {
    throwError('APIAuthenticationError', 'Invalid Authorization Token', 403);
  }
  console.log(`authToken: ${req.authToken}`);
  console.log(`authedUser: ${JSON.stringify(req.authedUser)}`);
  next();
};

app.use(asyncMiddleware(getTokenAndUser));

routes(app);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
  console.log('Running in ' + (process.env.PRODUCTION ? 'Production' : 'Development'));
});

module.exports = app;
