const express = require("express");
const router = express.Router();
const { signup, loginPage, register, login, allUser,logout, } = require("./Controller/userController");
const requireAuth = require("./middleware/auth");
const {myBlog, addBlog, createBlog, deleteBlog,editBlog ,updateBlog,home} = require("./Controller/blogsController")

router.get('/signup',signup)
router.get('/login',loginPage)
router.post('/register',register)
router.post('/login',login)
router.get('/allUser',allUser)
router.get("/logout", logout);
router.get("/home",home)
router.get('/',home)
router.get('/myblog',requireAuth,myBlog)
router.get('/addblog',requireAuth,addBlog)
router.post('/createblog',requireAuth,createBlog)
router.post('/deleteblog/:id',requireAuth,deleteBlog)
router.get("/editblog/:id",requireAuth,editBlog);
router.post("/editblog/:id",requireAuth, updateBlog);

module.exports = router;