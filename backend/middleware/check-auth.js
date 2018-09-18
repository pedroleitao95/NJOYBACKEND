//Check if token is attached to request and validate token

const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {
  try {
    //[0] -> Bearer
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({
      message: 'You are not authenticated'
    });
  }




}
