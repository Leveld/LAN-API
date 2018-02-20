const controllers = require('../controllers');
const { asyncMiddleware } = require('capstone-utils');

module.exports = (app) => {
  app
    .route('/user')
    .get(asyncMiddleware(controllers.users.getUser))
    .put(asyncMiddleware(controllers.users.convertToOtherUserType))
    .patch(asyncMiddleware(controllers.users.updateUser));
    
  app
    .route('/user/co')
    .patch(asyncMiddleware(controllers.users.addContentOutlet));
};
