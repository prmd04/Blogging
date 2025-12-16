const requireAuth = (req,res,next)=>{
 if (!req.session.isAuth) {
    return res.redirect("/login");
 }
  next();
}



module.exports = requireAuth;