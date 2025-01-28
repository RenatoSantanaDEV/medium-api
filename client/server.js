const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
