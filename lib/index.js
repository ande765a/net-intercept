const net = require("net")

module.exports = function intercept(from, to, cb) {
  const client = new net.Socket()
  const server = net.createServer(socket => {
    client.connect(to)
    socket.on("data", data => client.write(data))
    client.on("data", data => socket.write(data))
    client.on("close", () => socket.end())
    socket.on("close", () => client.end())
    cb(client, socket)
  })
  server.listen(from)
}
