require('babel-register');

const app = require('./app').default;

app.listen(5000, () => console.log('server running'));
