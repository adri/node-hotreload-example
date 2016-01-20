
// Start with hot reloading: node index hotreload
const isHot = process.argv[2] === 'hotreload';
const app = isHot ? require('./hotreload') : require('./src/server');

app.listen(3000, () => console.log('Listening on http://localhost:3000'));

