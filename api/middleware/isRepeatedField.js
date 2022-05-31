module.exports = (model, field) => async (req, res, next) => {
  const resource = await model.exists({ [field]: req.body[field] });
  if (resource)
    return res.status(409).send({
      code: 4102,
      message: `${field} must be unique`,
    });
  next();
};
