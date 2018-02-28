const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { throwError, asyncMiddleware } = require('capstone-utils');

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
  if (req.authToken === null)
    throwError('APIAuthenticationError', 'Missing Authorization Token', 403);
  try {
     const user = await axios.get(`${apiServerIP}user`, { headers: { Authorization: `Bearer ${token}`}, withCredentials: true });
     if (user)
      req.authedUser = user.data;
  } catch (error) {
    throwError('APIAuthenticationError', 'Invalid Authorization Token', 403);
  }
  next();
};

app.use(asyncMiddleware(getTokenAndUser));

routes(app);

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
  console.log('Running in ' + (process.env.PRODUCTION ? 'Production' : 'Development'));
});

module.exports = app;
