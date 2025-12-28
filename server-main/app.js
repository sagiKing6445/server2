const PORT = 3000;
const server = require('./middleware/server');

server.listen(PORT, () => {
    console.log(`Server running  on http://localhost:${PORT}`);
});


