const { ObjectId } = require('mongoose').Types;
const ERRORCODES = require('../utils/codes');

module.exports = (req, res, next) => {
  if (ObjectId.isValid(req.params.id)) return next();
  res.status(400).send({ code: 4116, message: ERRORCODES[4116] });
};
