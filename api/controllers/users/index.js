const R = require('ramda');
const {
  registerUser,
  loginUser,
  passwordReseter,
  setResetPassword,
  getUserInfo,
} = require('./core');
const { sendMail } = require('./../../apis/mail');

const { CLIENT_URL, NODE_ENV: env } = process.env;

const constructClientURLs = (token, section) =>
  `${CLIENT_URL}/${section}/${token}`;

module.exports = {
  newUser: async (req, res, next) => {
    const { createdUser } = await registerUser(req.body);
    res.status(202).send({
      code: 202,
      message: 'User created',
      data: R.pick(['_id', 'name', 'email', 'role'], createdUser),
    });
  },
  loginUser: async (req, res, next) => {
    const data = await loginUser(req.body);
    if (data.error) return next(data);
    res.status(202).send({ code: 202, message: 'Successful login', data });
  },

  requestReset: async ({ body }, res, next) => {
    const data = await passwordReseter(body);
    if (data.error) return next(data);
    const { reseter_token, user } = data;
    const url = constructClientURLs(reseter_token, 'reset');
    // if (env !== 'test')
    await sendMail({ ...user, url });
    res.status(202).send({
      code: 202,
      message: 'Reseter Token Sent',
      data: { user },
    });
  },

  resetPassword: async ({ body, user }, res, next) => {
    const message = await setResetPassword({
      _id: user._id,
      newPassword: body.password,
    });

    if (message.error) return next(message);
    res.status(201).send({ code: 201, message });
  },
  infoUser: async ({ user: { _id } }, res, next) => {
    const user = await getUserInfo(_id);
    res.status(200).send({ code: 200, message: 'User found', data: { user } });
  },
};
