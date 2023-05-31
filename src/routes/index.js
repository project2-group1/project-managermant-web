const calendarRouter = require('./calendar.js');
const meRouter = require('./me')
const listRouter = require('./list')
const assignmentRouter = require('./assignment')
const meetingRouter = require('./meeting')

function route(app) {
    app.use('/assignment', assignmentRouter);
    app.use('/list', listRouter);
    app.use('/meeting', meetingRouter);
    app.use('/me', meRouter);
    app.use('/', calendarRouter);
}

module.exports = route;