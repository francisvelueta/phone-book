const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const envDB = env =>
  env === 'production'
    ? 'Phone-Book-App'
    : env === 'dev'
    ? 'Phone-Book-Sandbox'
    : 'Phone-Book-test';

// Connection mongodb I'm using Atlas Cloud
const connecDB = (user, pass, host, env) =>
  env !== 'test'
    ? `mongodb+srv://${user}:${pass}@${host}/${envDB(
        env,
      )}?retryWrites=true&w=majority`
    : `mongodb://localhost:27017/phone-book`;

module.exports = async () => {
  const { DB_USER, DB_PASS, DB_HOST, NODE_ENV } = process.env;
  try {
    const connect = await mongoose.connect(
      connecDB(DB_USER, DB_PASS, DB_HOST, NODE_ENV),
    );
    if (connect) return console.log(`Connect to Atlas and ${envDB(NODE_ENV)}`);
  } catch (error) {
    throw new Error(error);
  }
};
