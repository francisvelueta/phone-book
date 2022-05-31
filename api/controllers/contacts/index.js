const R = require('ramda');
const {
  registerContact,
  setEditContact,
  getAContact,
  getContactsByUser,
  removeContact,
} = require('./core');
const { sortItems } = require('../../utils/fns');

module.exports = {
  newContact: async ({ body, user: { _id } }, res, next) => {
    const { createdContact } = await registerContact(body, _id);
    res.status(202).send({
      code: 202,
      message: 'Item created',
      data: R.pick(
        ['_id', 'name', 'last_name', 'phone_number', 'address_lines'],
        createdContact,
      ),
    });
  },
  updateContact: async ({ body, params: { id } }, res, next) => {
    const data = await setEditContact({ body, id });
    if (data.error) return next(data);
    res.send({
      code: 201,
      message: 'Contact data updated',
      data: R.mergeRight(data, body),
    });
  },
  getContact: async ({ params: { id } }, res, next) => {
    const data = await getAContact(id);
    if (data.error) return next(data);
    res
      .status(200)
      .send({ code: 200, message: 'Contact successfully retrieved', data });
  },
  getContacts: async ({ user: { _id } }, res, next) => {
    const data = await getContactsByUser(_id);
    if (data.error) return next(data);
    res.status(200).send({
      code: 200,
      message: R.isEmpty(data)
        ? 'No contacts were found'
        : 'Contacts successfully fetched',
      data: sortItems('name')(data),
    });
  },
  deleteContact: async ({ params: { id } }, res, next) => {
    const data = await removeContact(id);
    if (data.error) return next(data);
    res.status(204).end();
  },
};
