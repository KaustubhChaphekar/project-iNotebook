const jwt = require('jsonwebtoken');
const J_W_T = process.env.JWT_SECRET

const fetchUser = (req, res, next) => {
    //get the user from jwt token and add id to req object
    const token = req.header("auth-token");

    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, J_W_T);
        req.user = data.user;
        next();
    } catch (error) {
      return res.status(401).send({ error: "please authenticate using a valid token" })
    }

}

module.exports = fetchUser