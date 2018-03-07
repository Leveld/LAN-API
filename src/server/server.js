const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const cachios = require('cachios');
const { throwError, asyncMiddleware, apiServerIP, authServerIP } = require('capstone-utils');
const { getUser } = require('./controllers/users');
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
  // sketchy but we gotta do it for now :/
  if (req.path === '/clearCache') {
    cachios.cache.flushAll()
    return await res.send('cleared');
  }
  if (req.authToken === null)
    throwError('APIAuthenticationError', 'Missing Authorization Token', 403);
  try {
    const user = await getUser(req);
    if (user)
      req.authedUser = user;
  } catch (error) {
    console.log(error.response.data);
    throwError('APIAuthenticationError', `Invalid Authorization Token '${req.authToken}'`, 403);
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
