// const Meeting = require('../models/Meeting.js')

class MeetingController {
    // [GET] /news
    show(req, res, next) {
        res.render('meeting/meeting', {
            title: 'Cuộc hẹn',
            css: [
                '//cdn.quilljs.com/1.3.6/quill.snow.css',
                'css/meeting.css',
            ],
            libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
            handle: 'js/meeting.js',
            displayBtn: true,
        });
    }

    getAllMeetings2 = (req, res, next) => {
        // let { title, body } = req.body
        try {
            let meetings = Meeting.findAll()
            console.log(meetings);
            res.render('meeting/meeting', {
                title: 'Cuộc hẹn',
                css: [
                    '//cdn.quilljs.com/1.3.6/quill.snow.css',
                    'css/meeting.css',
                ],
                libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
                handle: 'js/meeting.js',
                displayBtn: true,
                meetings: meetings,
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    // getMeetingById2 = async (req, res, next) => {
    //     // let { title, body } = req.body
    //     try {
    //         let meetingId = req.params.id

    //         let meeting = await Meeting.getMeetingById(meetingId)

    //         res.status(200).json({ meeting })

    //     } catch (error) {
    //         console.log(errer);
    //         next(error)
    //     }
    // }
}

// exports.getAllMeetings = (req,res,next) => {
//     res.send("Get all posts")
// }

// exports.getMeetingById = (req,res,next) => {
//     res.send("Get post by id")
// }

// exports.createMeeting = (req,res,next) => {
//     res.send("create meeting")
// }

module.exports = new MeetingController();
