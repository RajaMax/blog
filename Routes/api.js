
const Router = require('express').Router();
const { body, validationResult } = require('express-validator');

const BlogController = require('../Controller/BlogController')

Router.get('/blogs',BlogController.getBlogs)
Router.post('/blog',BlogController.createBlog)
Router.post('/comment',BlogController.createBlogComment)
Router.get('/comment/:blogId',BlogController.getComments)

module.exports = Router;
