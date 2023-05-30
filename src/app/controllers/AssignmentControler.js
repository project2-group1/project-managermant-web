
class AssignmentController {
    // [GET] /news
    show(req, res, next) {
        res.render('assignments/assignment.hbs');
    }
}

module.exports = new AssignmentController();
