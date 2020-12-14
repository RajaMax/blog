exports.successResponse = function (res, msg) {
	var data = {
		status: 1,
		responseCode: 200,
		message: msg
	};
	return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
	var resData = {
		status: 1,
		responseCode: 200,
		message: msg,
		data: data
	};
	return res.status(200).json(resData);
};

exports.ErrorResponse = function (res, msg) {
	var data = {
		status: 0,
		responseCode: 500,
		message: msg,
	};
	return res.status(500).json(data);
};

exports.ErrorResponseWithData = function (res, msg, data) {
	var resData = {
		status: 0,
		responseCode: 500,
		message: msg,
		data: data
	};
	return res.status(500).json(resData);
};

exports.validationErrorWithData = function (res, msg, data) {
	var resData = {
		status: 0,
		responseCode: 400,
		message: msg,
		data: data
	};
	return res.status(400).json(resData);
};

exports.validationError = function (res,msg) {
	var resData = {
		status: 0,
		responseCode: 400,
		message: msg,
	};
	return res.status(400).json(resData);
};

exports.notFoundResponse = function (res, msg) {
	var data = {
		status: 0,
		responseCode: 404,
		message: msg,
	};
	return res.status(404).json(data);
};