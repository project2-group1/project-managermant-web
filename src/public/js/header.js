import { fetchData } from '../services/fetchData.js'

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const socket = io()
// XỬ lý add calendar
const btn_add_calendar = $('.btn.btn-add-calendar');
const make_calendar_container = $('.make-calendar.container');
const add_free_time = $('.add-free.container')
let btnSubmit
let makeCalendarModal
let formCalendarModal
let optAddFreetime
let optAddMeeting
let btnOptAddMeeting
let btnOptAddFreetime

const btnAvatarNav = $('.btn-avatar')
const avatarNav = $('.avatar-nav')
const avatarImg = $('.avatar-img>img')
const avatarNavAccount = $('.avatar-nav-account')
const avatarNavLogout = $('.avatar-nav-logout')
const avatarNavSetting = $('.avatar-nav-setting')
const avatarNavCalendar = $('.avatar-nav-calendar')

const btnNotification = $('.btn-notification')
const iconNotification = $('.btn-notification>i')
const boxNotification = $('.box-notification')
const contentBoxNotification = $('.box-notification .content')

let startTime
let endTime

const btnLogoPage = $('.btn-logo')

const currentDay = new Date();

let allMeetingsData
let generalData
let user

function countTime(time) {
    let displayTime = currentDay - formatDateFromUTCToLocal(time) // milliseconds

    displayTime = displayTime / 1000 / 60 // minutes

    if (displayTime < 60) {
        return (Math.ceil(displayTime) > 0 ? Math.ceil(displayTime) : 1) + ' phút trước'
    }
    else if (displayTime <= 24 * 60) {
        return Math.floor(displayTime / 60) + ' giờ trước'
    }
    else {
        return Math.floor(displayTime / 60 / 24) + ' ngày trước'
    }

}

const modalAddCalendar = {
    inputStartTime: null,
    inputEndTime: null,
    inputReportTime: null,
    selectedStartTime: null,
    allMeetingsDataInstance: null,
    API: async function () {

        async function getData(URL) {
            try {
                const responseData = await fetchData(URL)
                return responseData
            } catch (err) {
                console.log(err)
            }
        }


        // courseId and Term in Database
        generalData = await getData(`/meeting/api/general`)

        // allMeetingsData dùng trực tiếp ko try catch (nguy hiểm)
        // chứa 2 bảng kiểu object là groupstudent và meeting
        allMeetingsData = await fetchData('/meeting/api/all')
        this.allMeetingsDataInstance = allMeetingsData
        user = await getData('/me/user') // user info
    },
    config: function () {
        const _this = this

        var text = `
        <div class="modal">
            <div class="modal-header">
                <button class="opt-header btn-opt-add-meeting"><h3 class="title">Thêm cuộc họp</h3></button>
                <button class="opt-header btn-opt-add-freetime"><h3 class="title">Thêm lịch rảnh</h3></button>
                <button class="btn btn-close-calendar"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body opt-add-meeting">
                <form class="make-calendar-form" method="POST" action="/create">
                    <div class="row">
                        <h4 class="title">Tiêu đề</h4>
                        <div class="input-group input-group-icon">
                            <div class="input-icon"><i class="fa-solid fa-server"></i></div>
                            <input class="input-title" type="text" name="title" placeholder="Tiêu đề" required/>
                        </div>
                    </div>
                    <div class="row">
                        <h4>Nhóm</h4>
                        <div class="input-group">
                            <div class="col-third">
                                <select id="term" name="term" required>
                                    <option value="" disabled selected>Kỳ</option>
                                </select>
                            </div>
                            <div class="col-third">
                                <select id="course_id" name="course_id" required>
                                    <option value="" disabled selected>Học phần</option>
                                </select>
                            </div>
                            <div class="col-third">
                                <select id="group_id" name="group_id" required>
                                    <option value="" disabled selected>Nhóm</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <h4>Thời gian</h4>
                        <div class="row">
                            <p class="p-time">Bắt đầu</p>
                            <input class="input-time start_time" type="text" id="start_time" name="start_time">
                            <div class="modal-flatpickr"></div>
                        </div>
                        <div class="row">
                            <p class="p-time">Kết thúc</p>
                            <input class="input-time end_time" type="text" id="end_time" name="end_time">
                        </div>
                        <div class="row">
                            <p class="p-time">Hạn báo cáo</p>
                            <input class="input-time report_time" type="text" id="dl_report_time" name="dl_report_time">
                        </div>
                    </div>
                    <div class="row mt-8">
                        <h4>Yêu cầu</h4>
                        <textarea class="require" name="require_meeting" placeholder="Yêu cầu"></textarea>
                    </div>
                    <div class="row">
                        <input type="submit"  class="submit" value="Thêm cuộc họp mới">
                    </div>
                </form>
            </div>
            <div class="modal-body opt-add-freetime">
                <form class="make-calendar-form" method="POST" action="/freetime/create">
                    <div class="row">
                        <h4>Thời gian</h4>
                        <div class="row">
                            <p class="p-time">Bắt đầu</p>
                            <input class="input-time start_time" type="text" id="start_time" name="start_time">
                            <div class="modal-flatpickr"></div>
                        </div>
                        <div class="row">
                            <p class="p-time">Kết thúc</p>
                            <input class="input-time end_time" type="text" id="end_time" name="end_time">
                        </div>
                    </div>
                    <div class="row">
                        <input type="submit"  class="submit" value="Thêm lịch rảnh">
                    </div>
                </form>
            </div>
        </div>
     `
        make_calendar_container.innerHTML = text;
        makeCalendarModal = $('.make-calendar .modal')
        formCalendarModal = $('.make-calendar-form')
        optAddMeeting = $('.opt-add-meeting')
        optAddFreetime = $('.opt-add-freetime')
        btnSubmit = $('.make-calendar .submit')
        btnOptAddMeeting = $('.btn-opt-add-meeting')
        btnOptAddFreetime = $('.btn-opt-add-freetime')

        this.inputStartTime = flatpickr('.input-time.start_time', {
            enableTime: true,
            defaultDate: "today",
            dateFormat: "Y-m-d H:i",
            onChange: function (selectedDate, dateStr, instance) {
                _this.selectedStartTime = dateStr
            },
            minuteIncrement: 30,
            minTime: "7:00",
            maxTime: "18:00"
        })

        this.inputEndTime = flatpickr('.input-time.end_time', {
            enableTime: true,
            defaultDate: "today",
            dateFormat: "Y-m-d H:i",
            minuteIncrement: 30,
            minTime: "7:00",
            maxTime: "18:00"
        })

        const today = new Date();
        const thisDayNextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        this.inputReportTime = flatpickr('.input-time.report_time', {
            enableTime: true,
            defaultDate: thisDayNextWeek,
            dateFormat: "Y-m-d H:i",
            minuteIncrement: 30
        })

        startTime = $('.start_time')
        endTime = $('.end_time')

    },
    handle: function () {
        const btnCloseCalendar = $('.btn-close-calendar')

        if (btn_add_calendar) {
            btn_add_calendar.onclick = function () {
                make_calendar_container.classList.add('show');
            }
        }

        btnCloseCalendar.addEventListener('click', function () {
            make_calendar_container.classList.remove('show');
        })

        btnLogoPage.addEventListener('click', function () {
            window.location.href = `/`
        })

        btnNotification.addEventListener('click', function (e) {
            boxNotification.classList.toggle('show')
        })

        btnAvatarNav.addEventListener('click', function (e) {
            avatarNav.classList.toggle('show')
        })

        avatarNavAccount.addEventListener('click', function () {
            window.location.href = `me/account`
        })

        avatarNavCalendar.addEventListener('click', function () {
            window.location.href = `/`
        })

        avatarNavSetting.addEventListener('click', function () {
            window.location.href = `me/setting`
        })

        avatarNavLogout.addEventListener('click', function () {
            window.location.href = `/auth/logout`
        })



        document.addEventListener('click', function (event) {
            const target = event.target

            if (!boxNotification.contains(target) && !target.closest('.btn-notification')) {
                boxNotification.classList.remove('show')
            }

            if (!avatarNav.contains(target) && !target.closest('.btn-avatar')) {
                avatarNav.classList.remove('show')
            }
        })

        make_calendar_container.addEventListener('click', function (event) {
            const target = event.target
            if (!makeCalendarModal.contains(target)) {
                make_calendar_container.classList.remove('show')
            }
        })

        
        btnOptAddMeeting.addEventListener('click', (e) => {
            if(!btnOptAddMeeting.classList.contains('active')) {
                btnOptAddMeeting.classList.add('active')
                btnOptAddFreetime.classList.remove('active')

                optAddMeeting.classList.add('show')
                optAddFreetime.classList.remove('show')
            }
        })

        btnOptAddFreetime.addEventListener('click', (e) => {
            if(!btnOptAddFreetime.classList.contains('active')) {
                btnOptAddMeeting.classList.remove('active')
                btnOptAddFreetime.classList.add('active')

                optAddMeeting.classList.remove('show')
                optAddFreetime.classList.add('show')
            }
        })

    },
    render: function () {
        const _this = this

        btnOptAddMeeting.classList.add('active')
        optAddMeeting.classList.add('show')

        const termSelectTag = makeCalendarModal.querySelector('#term')
        const courseIdSelectTag = makeCalendarModal.querySelector('#course_id')
        const groupIdSelectTag = makeCalendarModal.querySelector('#group_id')
        let selectedTerm
        let selectedCourseId
        let selectedGroupId

        for (let i = 0; i < generalData.termDB.length; i++) {
            let optionElement = document.createElement("option")
            optionElement.text = generalData.termDB[i].term
            optionElement.value = generalData.termDB[i].term
            termSelectTag.add(optionElement)
        }

        termSelectTag.addEventListener('change', function () {
            courseIdSelectTag.innerHTML = `
                <option value="" disabled selected>Học phần</option>
            `
            selectedTerm = termSelectTag.options[termSelectTag.selectedIndex]
            console.log("Term: " + selectedTerm.value)

            for (let i = 0; i < generalData.courseIdDB.length; i++) {
                let optionElement = document.createElement("option")
                if (generalData.courseIdDB[i].term == selectedTerm.value) {
                    optionElement.text = generalData.courseIdDB[i].course_id
                    optionElement.value = generalData.courseIdDB[i].course_id
                    courseIdSelectTag.add(optionElement)
                }
            }
        })

        courseIdSelectTag.addEventListener('change', function () {
            groupIdSelectTag.innerHTML = `
                <option value="" disabled selected>Nhóm</option>
            `
            selectedCourseId = courseIdSelectTag.options[courseIdSelectTag.selectedIndex]
            console.log("Course: " + selectedCourseId.value)

            for (let i = 0; i < allMeetingsData.groupstudent.length; i++) {
                let optionElement = document.createElement("option")
                if (allMeetingsData.groupstudent[i].course_id == selectedCourseId.value) {
                    optionElement.text = allMeetingsData.groupstudent[i].group_id
                    optionElement.value = allMeetingsData.groupstudent[i].group_id
                    groupIdSelectTag.add(optionElement)
                }
            }
        })

        groupIdSelectTag.addEventListener('change', function () {
            selectedGroupId = groupIdSelectTag.options[groupIdSelectTag.selectedIndex]
            console.log("Group: " + selectedGroupId.value)
        })

    },
    renderNotification: function () {

        const meetings = allMeetingsData.meeting

        const stateCommentMapping = {
            pending: 'đã tạo một cuộc hẹn',
            ongoing: '',
            finished: '',
            reschedule: 'yêu cầu thay đổi lịch hẹn'
        }

        for (let i = 0; i < meetings.length; i++) {
            const e = meetings[i]

            const stateComment = stateCommentMapping[e.state]
            const time = countTime(e.created_at)

            const notiHTML = `
                <div class="notification">
                    <img src="/img/avatar.png" alt="" />
                    <div class="text">
                        <p>
                            <span class="name">Nhóm ${e.group_id % 100} - ${e.coursename}</span>
                            <span class="state">${stateComment}</span>
                        </p>
                        <p class="project-name">Đề tài: ${e.projectname}</p>
                        <p class="title">${e.title}</p>
                        <p class="time">${time}</p>
                    </div>
                </div>
                `

            const tempElement = document.createElement('div')
            tempElement.innerHTML = notiHTML

            contentBoxNotification.insertBefore(tempElement.firstElementChild, contentBoxNotification.firstElementChild)
        }


    },
    start: async function () {
        await this.API()
        this.config()
        this.handle()
        this.render()
        this.renderNotification()
    }
}

const modalAddFreeTime = {
    inputStartTime: null,
    inputEndTime: null,
    form: null,
    config: function () {
        const text = `
        <form method="POST" action="create" class="addfreetime">
            <div class="row">
                <h4>Thời gian</h4>
                <div class="row">
                    <p class="p-time">Bắt đầu</p>
                    <input class="input-time start_time1" type="text" id="start_time" name="start_time">
                    <div class="modal-flatpickr"></div>
                </div>
                <div class="row">
                    <p class="p-time">Kết thúc</p>
                    <input class="input-time end_time1" type="text" id="end_time" name="end_time">
                </div>
            </div>
            </div>
            <div class="row">
                <input type="submit" class="submit1" value="Thêm cuộc họp mới">
            </div>
        </form>        
     `
        add_free_time.innerHTML = text;

        this.inputStartTime = flatpickr('.input-time.start_time1', {
            enableTime: true,
            defaultDate: "today",
            dateFormat: "Y-m-d H:i",
            minuteIncrement: 30,
            minTime: "7:00",
            maxTime: "18:00"
        })

        this.inputEndTime = flatpickr('.input-time.end_time1', {
            enableTime: true,
            defaultDate: "today",
            dateFormat: "Y-m-d H:i",
            minuteIncrement: 30,
            minTime: "7:00",
            maxTime: "18:00"
        })

        this.form = flatpickr('.addfreetime', {

        });
    },
    render: function() {
        
    },
    handle: function () {
        const workBoxes = Array.from($$('.work-box'));
        // workBoxes.forEach(function (workBox) {
        //     workBox.addEventListener('click', (workBox) => {
        //        const form = $('.addfreetime');
        //        form.submit();
        //     })
        // })

    },
    start: function () {
        this.config()
        this.render()
        this.handle()
    }
}

modalAddFreeTime.start()
modalAddCalendar.start()

export { modalAddCalendar, modalAddFreeTime }