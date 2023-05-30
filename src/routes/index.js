const calendarRouter = require('./calendar.js')
const meetingRouter = require('./meeting.js')

function route(app) {
    app.use('/meeting', meetingRouter)
    app.use('/', calendarRouter);
}

module.exports = route;

/* 
    Từ route index.js(route chính liên kết các route)
    mỗi khi truy cập vào web có phần đuôi là news/courses => sẽ chuyển đến newsRouter/coursesRouter
    
    Từ các Router nhỏ sẽ gọi đễn Controller với phương thức .Show() và .Render() ra dữ liệu

    Tại Controller. import Models tương ứng vào và lấy ra từ database

    // Tính chất của route: khi route match với Router / trên cùng sẽ ko match xuống Router bên dưới nữa
*/
