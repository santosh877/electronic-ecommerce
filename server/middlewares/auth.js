const firebaseAdmin = require('../firebase');

exports.authCheck = async (req, res, next) => {
    try{
     
      const firebaseUser = await firebaseAdmin.auth().verifyIdToken(req.headers.authtoken);
      console.log("AUTH-USER", firebaseUser)
      req.user = firebaseUser;
      next()
    } catch(err) {
        res.status(401).json({
            err: "invalid or expired token"
        })
    }
}