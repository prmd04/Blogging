const Blogs = require("../model/blogs");

const home = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    const sortType = req.query.sort || "title";

    let sortOption = {};

    if (sortType === "date") {
      sortOption = { createdAt: -1 };
    } else {
      sortOption = { title: 1 };
    }

    const totalBlogs = await Blogs.countDocuments();

    const blogs = await Blogs.find()
      .skip(skip)
      .limit(limit)
      .sort(sortOption);

    const totalPages = Math.ceil(totalBlogs / limit);

    res.render("home", {
      blogData: blogs,
      currentPage: page,
      totalPages,
      sortType
    });
  } catch (err) {
    console.log(err);
    res.render("home", {
      blogData: [],
      currentPage: 1,
      totalPages: 1,
      sortType: "title"
    });
  }
};




const myBlog = async (req, res) => {
  try {
    const userId = req.session.Userid;
    const myBlogs = await Blogs.find({ userId });

    const message = req.session.flashMessage || null;
    delete req.session.flashMessage;

    res.render("myBlogs", {
      blogData: myBlogs,
      message
    });
  } catch (err) {
    console.log(err);
    res.render("myBlogs", {
      blogData: [],
      message: "Failed to load blogs"
    });
  }
};


const addBlog = (req, res) => {
  res.render("addBlogs", {
    message: null
  });
};


const createBlog = async (req, res) => {
  try {
    const { title, body } = req.body;

    const newBlog = new Blogs({
      title,
      body,
      userId: req.session.Userid
    });

    await newBlog.save();

    req.session.flashMessage = "Blog saved successfully!";
    res.redirect("/myblog");
  } catch (err) {
    console.log(err);
    res.render("addBlogs", {
      message: "Blog cannot be saved. Please try again."
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.session.Userid;

    console.log(blogId);

    await Blogs.findOneAndDelete({
      _id: blogId,
      userId
    });

    req.session.flashMessage = "Blog deleted successfully!";
    res.redirect("/myblog");
  } catch (err) {
    console.log(err);
    req.session.flashMessage = "Failed to delete blog";
    res.redirect("/myblog");
  }
};

const editBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.session.Userid;

    const blog = await Blogs.findOne({
      _id: blogId,
      userId
    });

    if (!blog) {
      req.session.flashMessage = "Blog not found";
      return res.redirect("/myblog");
    }

    res.render("editBlog", {
      blog,
      message: null
    });
  } catch (err) {
    console.log(err);
    res.redirect("/myblog");
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.session.Userid;
    const { title, body } = req.body;

    await Blogs.findOneAndUpdate(
      { _id: blogId, userId },
      { title, body },
      { new: true }
    );

    req.session.flashMessage = "Blog updated successfully!";
    res.redirect("/myblog");
  } catch (err) {
    console.log(err);
    req.session.flashMessage = "Failed to update blog";
    res.redirect("/myblog");
  }
};

module.exports = {
  home,
  myBlog,
  addBlog,
  createBlog,
  deleteBlog,
  editBlog,
  updateBlog
};
