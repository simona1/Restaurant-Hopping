require('babel-register');

const app = require('./app').default;

app.listen(4000, () => console.log('server running'));
