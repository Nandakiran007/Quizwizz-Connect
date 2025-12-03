const errorMiddleware = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  const extraDetails = error.extraDetails;
  console.log(error.message);
  return res.status(status).json({
    message,
    extraDetails,
  });
};
module.exports = errorMiddleware;
