const generalValidator = validationSchema => (req, res, next) => {
  const { error } = validationSchema.validate(req.body);
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ code: 4101, message });
  }
  next();
};

module.exports = {
  validateRequestWith: generalValidator,
};
