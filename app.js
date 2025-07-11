const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http);

const cartRoutes = require('./src/routes/cartRoutes');
const productRoutes = require('./src/routes/productRoutes');
const viewsRouter = require('./src/routes/viewsRouter');
app.use('/', viewsRouter);


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/src/views'));
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.json());
app.use('/api/cart', cartRoutes);
app.use('/api/product', productRoutes);


/*config de socketio*/
let messages = []; /*array para guardar mensajes en memoria*/

io.on("connection", (socket) => {
  console.log("New client connected");

  // Enviar mensajes previos al cliente que se conecta
  socket.emit("messagelist", messages);

  socket.on("message", (msg) => {
    messages.push({
      socketid: socket.id,
      message: msg,
    });
    io.emit("message", {
      socketid: socket.id,
      message: msg,
    });
  });
});

http.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

