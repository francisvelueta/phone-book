const R = require('ramda');
const { User } = require('../../models/user');
const errorResponse = require('../../utils/errorResponse');
const registerUser = async ({ name, email, password }) => {
  const encryptedPassword = await User.encryptPassword(password);

  const createdUser = await User.create({
    name,
    email,
    password: encryptedPassword,
    role: 'new',
  });
  return { createdUser };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email: R.toLower(email) }).exec();
  if (R.isNil(user)) return errorResponse(404, 4104);
  const passwordValid = await user.decryptPassword(password);
  if (R.not(passwordValid)) return errorResponse(400, 4103);
  const { _id, role } = user;
  const token = User.generateJWT({ _id, role, purpose: 'Login' });
  return { token, role };
};

const passwordReseter = async ({ email }) => {
  const user = await User.findOne({ email }).select('name email').lean().exec();
  if (!user) return errorResponse(404, 4104);
  const reseter_token = User.generateJWT(
    { _id: user._id, purpose: 'Reset' },
    '1h',
  );
  return { user, reseter_token };
};

const setResetPassword = async userData => {
  const { _id, newPassword } = userData;
  const password = await User.encryptPassword(newPassword);
  const resetedPass = await User.findByIdAndUpdate(_id, { password })
    .lean()
    .exec();
  if (!resetedPass) return errorResponse(404, 4104);
  return 'Password successfully changed';
};

const getUserInfo = R.compose(
  R.andThen(R.when(R.isNil, R.always(errorResponse(404, 4104)))),
  _id =>
    User.findById(_id)
      .select('-password -created_at -updated_at -__v')
      .lean()
      .exec(),
);

module.exports = {
  registerUser,
  loginUser,
  passwordReseter,
  setResetPassword,
  getUserInfo,
};
