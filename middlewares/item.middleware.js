const validateRequestBody = (req, res, next) => {
  const requestBody = req.body;

  if (Object.keys(requestBody).length == 0) {
    return res.status(400).json({
      message: "Request body is required for updating",
      status: "Error",
    });
  }

  next();
};

module.exports = { validateRequestBody };
