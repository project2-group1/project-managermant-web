const siteRouter = require('./site');
const meRouter = require('./me')
const studentRouter = require('./student')
const assignmentRouter = require('./assignment')
const meetingRouter = require('./meeting')
function route(app) {
    app.use('/me', meRouter);
    app.use('/student', studentRouter);
    app.use('/assignment', assignmentRouter);
    app.use('/meeting', meetingRouter);
    app.use('/', siteRouter);
}

module.exports = route;