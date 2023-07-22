const socketIO = require('socket.io')

function initSocket(server) {
    const io = socketIO(server)

    io.on('connection', (socket) => {
        console.log('A user connected')

        // Xử lý các sự kiện socket ở đây
        // Ví dụ: socket.on('eventName', handleEventFunction)
        socket.emit('notification', 'Welcome to our app!')

        setInterval(() => {
            io.emit('notification', 'New notification!')
        }, 10000)

        socket.on('disconnect', () => {
            console.log('A user disconnected')
        })
    })

    return io
}

module.exports = initSocket