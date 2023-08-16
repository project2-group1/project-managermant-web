const socketIO = require('socket.io')

function initSocket(server) {
    const io = socketIO(server)

    io.on('connection', (socket) => {
        // Xử lý các sự kiện socket ở đây
        // Ví dụ: socket.on('eventName', handleEventFunction)
        socket.emit('notification', 'Welcome to our app!')

        // Khi ngắt kết nối
        socket.on('disconnect', () => {
            console.log('A user disconnected')
        })
    })

    return io
}

module.exports = initSocket