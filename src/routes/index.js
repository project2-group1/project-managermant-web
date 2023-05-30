const calendarRouter = require('./calendar');
const settingRouter = require('./setting')
const listRouter = require('./setting')
const assignmentRouter = require('./assignment')
const meetingRouter = require('./meeting')
function route(app) {
    app.use('/assignment', assignmentRouter);
    app.use('/list', listRouter);
    app.use('/meeting', meetingRouter);
    app.use('/setting', settingRouter);
    app.use('/', calendarRouter);
}

module.exports = route;