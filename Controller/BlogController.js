const BlogModel = require('../Models/BlogModel')
const BlogCommentModel = require('../Models/BlogCommentModel');
const { body, validationResult } = require('express-validator');
const apiResponse = require('../Constants/APIResponse')

exports.getBlogs = [
    async (req, res) => {
        try {
            let findObj = {};
            if (req.query.date) {
                findObj.date = new Date(req.query.date);
            }
            let page = req.query.page ? Number(req.query.page) : 1;
            let limit = req.query.limit ? Number(req.query.limit) : 10;
            let skip = (page - 1) * limit;
            let blogs = await BlogModel.find(findObj).sort({ date: -1 }).skip(skip).limit(limit);
            let totalCount = await BlogModel.countDocuments(findObj);

            return apiResponse.successResponseWithData(
                res,
                "Blogs provided successfully",
                {
                    records: blogs,
                    count: totalCount
                }
            );
        } catch (err) {
            return apiResponse.validationErrorWithData(res, "Error Occured", err);
        }
    }
];

exports.createBlog = [
    body("description").exists().withMessage("Description is required"),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(
                    res,
                    "Validation Error.",
                    errors.array()
                );
            } else {
                let bodyData = {
                    description: req.body.description,
                    author: req.body.author || "",
                    date: new Date()
                }

                const blog = new BlogModel(bodyData);
                await blog.save();
                return apiResponse.successResponse(
                    res,
                    "Blog created Successfully",
                );
            }
        } catch (err) {
            return apiResponse.validationErrorWithData(res, "Error Occured", err);
        }
    }
]

exports.getComments = [
    async (req, res) => {
        try {
            let findObj = {
                blogId: req.params.blogId
            }
            let page = req.query.page ? Number(req.query.page) : 1;
            let limit = req.query.limit ? Number(req.query.limit) : 10;
            let skip = (page - 1) * limit;
            if (req.query.parentCommentId) {
                findObj.parentCommentId = req.query.parentCommentId
                findObj.isSubComment=true
            }else{
                findObj.isSubComment=false
            }
            let blogComments = await BlogCommentModel.find(findObj).sort({ createdAt: -1 }).skip(skip).limit(limit);
            let totalCount = await BlogCommentModel.countDocuments(findObj);

            return apiResponse.successResponseWithData(
                res,
                "Blog Comments provided successfully",
                {
                    records: blogComments,
                    count: totalCount
                }
            );
        } catch (err) {
            return apiResponse.validationErrorWithData(res, "Error Occured", err);
        }
    }
];

exports.createBlogComment = [
    body("message").exists().withMessage("Message is required"),
    body("blogId").exists().withMessage("BlogId is required"),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(
                    res,
                    "Validation Error.",
                    errors.array()
                );
            } else {
                let bodyData = {
                    blogId: req.body.blogId,
                    message: req.body.message,
                    date: new Date()
                }
                if (req.body.parentCommentId) {
                    bodyData.parentCommentId = req.body.parentCommentId
                    bodyData.isSubComment=true
                }else{
                    bodyData.isSubComment=false
                }

                const blog = new BlogCommentModel(bodyData);
                await blog.save();
                return apiResponse.successResponse(
                    res,
                    "Blog comment created Successfully",
                );
            }
        } catch (err) {
            return apiResponse.validationErrorWithData(res, "Error Occured", err);
        }
    }
]

