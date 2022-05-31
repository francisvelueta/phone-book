const R = require('ramda');
const { Contact } = require('../../models/contact');
const errorResponse = require('../../utils/errorResponse');

const registerContact = async (
  { name, last_name, phone_number, address_lines },
  _id,
) => {
  const createdContact = await Contact.create({
    name,
    last_name,
    phone_number,
    address_lines,
    created_by: _id,
  });
  return { createdContact };
};
const setEditContact = R.compose(
  R.andThen(R.when(R.isNil, R.always(errorResponse(404, 4104)))),
  ({ body: { name, last_name, phone_number, address_lines }, id }) =>
    Contact.findByIdAndUpdate(id, {
      name,
      last_name,
      phone_number,
      address_lines,
    })
      .select('  -updated_at -__v')
      .populate({ path: 'created_by', select: 'name' })
      .lean()
      .exec(),
);
const getContactsByUser = R.compose(
  R.andThen(R.when(R.isNil, R.always(errorResponse(404, 4104)))),
  created_by =>
    Contact.find({ created_by })
      .select('-updated_at -__v')
      .populate({ path: 'created_by', select: 'name ' })
      .lean()
      .exec(),
);

const getAContact = R.compose(
  R.andThen(R.when(R.isNil, R.always(errorResponse(404, 4104)))),
  id =>
    Contact.findById(id)
      .select('-updated_at -__v')
      .populate({ path: 'created_by', select: 'name ' })
      .lean()
      .exec(),
);

const removeContact = async _id => {
  const contact = await Contact.findOne({ _id });
  if (R.isNil(contact)) return errorResponse(404, 4104);
  return Contact.findByIdAndDelete(_id).lean().exec();
};
module.exports = {
  registerContact,
  setEditContact,
  getAContact,
  getContactsByUser,
  removeContact,
};
