module.exports = (error, {}, res, _) => {
  if (error.code) {
    const { status, code, message } = error;
    return res.status(status).send({ code, message });
  }
  console.log(new Date().toLocaleTimeString());
  console.log(error.stack);
  res.status(500).send({
    message: 'Something failed!, notify developers please!',
    errorMessage: error.message,
    ...(process.env.NODE_ENV !== 'production' && { errorStack: error.stack }),
  });
};
