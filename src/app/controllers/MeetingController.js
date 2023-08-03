const Meeting = require('../models/Meeting.js')

class MeetingController {
 
    // [GET] /
    async show(req, res, next) {
        const user = req.session.user
        try {
            const responseData = await new Promise((resolve, reject) => {
                Meeting.getAllEvents(user, function (data, err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
            })
            // console.log(responseData);
            res.render('calendar.hbs', {
                title: 'Lịch',
                css: [
                    'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
                    '/css/calendar.css',
                ],
                libraryJS: 'https://cdn.jsdelivr.net/npm/flatpickr',
                handle: [
                    '/js/calendar.js'
                ],
                data: responseData,
                role: user.role,
                teacher: user.role == 'giang_vien',
            })
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // [GET] /event/api/
    getAllEvents(req, res, next) {
        const user = req.session.user
        Meeting.getAllEvents(user, function (data, err) {
            if(err) {
                res.status(500).send(err)
                return
            }
            res.send(data)
        })
    }

    // [GET] /meeting/api/:id
    getDataMeetingByID(req, res ,next) {
        const user = req.session.user
        Meeting.getDataMeeting(req.params.id , function (data, err) {
            if(err) {
                res.status(500).send(err)
                return
            }
            res.send(data)
            // res.json(data)
        })

    }

    // [GET] /meeting/:id - Get meeting by id access though Model
    getMeetingById(req, res, next) {
        console.log(req.params.id);
        const user = req.session.user
        Meeting.getById(req.params.id, function (data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }

            // Render data
            res.render('meeting/meeting', {
                title: 'Cuộc hẹn',
                css: [
                    '//cdn.quilljs.com/1.3.6/quill.snow.css',
                    '/css/meeting.css',
                ],
                libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
                handle: '/js/meeting.js',
                displayBtn: true,
                teacher: user.role == 'giang_vien',
                btnAddMeeting: true,
                meetings: data.meeting,
                students: data.groupstudent,
            })

        })
    }

    // [GET] /meeting/api/all
    getAllMeetingsData(req, res, next) {
        Meeting.getAllMeetings(req.session.user, function (data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }
            res.send(data)
        })
    }

    // [GET] /meeting/api/gerenal
    getGeneralData(req, res, next) {
        Meeting.getGeneralData(req.session.user, function (data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }
            res.send(data)
        })
    }

    // [POST] /create/ -> redirect to /
    create(req, res, next) {
        const user = req.session.user
        Meeting.createMeeting(function (data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }
            res.redirect('/')
        }, req.body, user)
        // res.json(req.body)
    }

    
    // [PUT] /meeting/reschedule/:id
    rescheduleMeeting(req, res, next) {
        Meeting.rescheduleMeeting(req.body, function(data, err) {
            if(err) {
                res.status(500).send(err)
                return
            }
        })
    }
    
    // [POST] /meeting/reqaddmeeting/:id
    reqAddMeeting(req, res, next) {
        Meeting.sendReqAddMeeting(req.body, function(data, err) {
            if(err) {
                res.status(500).send(err)
                return
            }
        })
    }

    // [GET] /meeting/getreqaddmeeting/:id
    getReqAddMeeting(req, res, next) {
        Meeting.getReqAddMeeting(req.session.user, function(data, err) {
            if(err) {
                res.status(500).send(err)
                return
            }
            res.send(data)
        })
    }


    // [GET] /meeting/reqchange/:id
    getRequestChangeMeeting(req, res, next) {
        console.log(req.params.id)
        Meeting.getRequestChangeMeeting(req.params.id, function(data, err) {
            if(err) {
                res.status(500).send(err)
                return
            }
            res.send(data)
        })
    }

    // [PUT] /meeting/reqchange/:id
    requestChangeMeeting(req, res, next) {
        Meeting.requestChangeMeeting(req.body, function(data, err) {
            if(err) {
                res.status(500).send(err)
                return
            }
        })
    }

    // [PUT] /meeting/acceptchange/:id
    acceptChangeMeeting(req, res, next) {
        Meeting.acceptChangeMeeting(req.body, function(data, err) {
            if(err) {
                res.status(500).send(err)
                return
            }
        })
    }

    // [PUT] /meeting/acceptchange/:id
    refuseChangeMeeting(req, res, next) {
        Meeting.refuseChangeMeeting(req.params.id, function(data, err) {
            if(err) {
                res.status(500).send(err)
                return
            }
        })
    }
    
    // [PUT] /meeting/end/:id
    endMeeting(req, res, next) {
        console.log(req.body);
        Meeting.endMeeting(req.body, function(data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }
            // res.redirect('/')
        })
        // res.json(req.body)
    }

    //[DELETE] /meeting/delete/:id
    deleteMeeting(req, res, next) {
        Meeting.deleteMeeting(req.params.id, function(data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }

            // res.redirect('/')
        })
    }

    //[GET] /api/groupstudent
    getGroupStudent(req, res, next) {
        Meeting.getGroupStudent(req.session.user, function(data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }

            res.send(data)
        })
    }

    

}

module.exports = new MeetingController();
