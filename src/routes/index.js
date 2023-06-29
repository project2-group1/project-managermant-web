const calendarRouter = require('./calendar.js');
const meRouter = require('./me')
const listRouter = require('./list')
const assignmentRouter = require('./assignment')
const meetingRouter = require('./meeting')
const loginRouter = require('./login.js');

function route(app) {
    app.use('/assignment', assignmentRouter);
    app.use('/list', listRouter);
    app.use('/', meetingRouter);
    app.use('/me', meRouter);
    // app.use('/auth', loginRouter); // Xác thực
    // app.use('/', calendarRouter);
}

module.exports = route;