const app = require('./app');
const { PORT, MSG } = process.env;
const port = PORT || 5000;

app.listen(port, () => console.log(`Server ${MSG} in port: ${port}`));
