const R = require('ramda');
const jwt = require('jsonwebtoken');
const codes = require('../utils/codes');

module.exports = tokenType => (req, res, next) => {
  const token = req.header('auth') || req.params.token;
  if (R.or(R.isNil(token), !token))
    return res.status(405).send({ code: 4107, message: codes[4107] });
  try {
    const decoded = jwt.verify(token, process.env.WEBTOKEN_SECRET);
    const { purpose } = decoded;
    if (R.or(!purpose, purpose !== tokenType))
      return res.status(405).send({ code: 4109, message: codes[4109] });
    req.user = { ...decoded };
    next();
  } catch (ex) {
    return res.status(405).send({ code: 4108, message: codes[4108] });
  }
};
