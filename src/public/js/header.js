import { fetchData } from '../services/fetchData.js'

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// XỬ lý add calendar
const btn_add_calendar = $('.btn.btn-add-calendar');
const make_calendar_container = $('.make-calendar.container');
const add_free_time = $('.add-free.container')
let btnSubmit
let makeCalendarModal
let formCalendarModal

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

const urlParams = new URLSearchParams(window.location.search);
const roleParam = urlParams.get('r');

const btnLogoPage = $('.btn-logo')

let allMeetingsData
let generalData

const modalAddCalendar = {
    inputStartTime: null,
    inputEndTime: null,
    inputReportTime: null,
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
    },
    config: function () {
        var text = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="title">Thêm cuộc họp mới</h3>
                <button class="btn btn-close-calendar"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body">
                <form class="make-calendar-form" method="POST" action="/create">
                    <div class="row">
                        <h4>Tiêu đề</h4>
                        <div class="input-group input-group-icon">
                            <div class="input-icon"><i class="fa-solid fa-server"></i></div>
                            <input class="input-text" type="text" name="title" placeholder="Tiêu đề"/>
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
                        <textarea class="note" name="require_meeting" placeholder="Yêu cầu"></textarea>
                    </div>
                    <div class="row">
                        <input type="submit"  class="submit" value="Thêm cuộc họp mới">
                    </div>
                </form>
            </div>
        </div>
     `
        make_calendar_container.innerHTML = text;
        makeCalendarModal = $('.make-calendar .modal')
        formCalendarModal = $('.make-calendar-form')
        btnSubmit = $('.make-calendar .submit')

        this.inputStartTime = flatpickr('.input-time.start_time', {
            enableTime: true,
            defaultDate: "today",
            dateFormat: "Y-m-d H:i",
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

        avatarNavAccount.addEventListener('click', function() {
            window.location.href = `me/account`
        })

        avatarNavCalendar.addEventListener('click', function() {
            window.location.href = `/`
        })

        avatarNavSetting.addEventListener('click', function() {
            window.location.href = `me/setting`
        })

        avatarNavLogout.addEventListener('click', function() {
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

    },
    render: function () {
        const _this = this

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

        // btnSubmit.addEventListener('click', function(e) {
        //     e.preventDefault()
        //     formCalendarModal.submit()
        //     window.location.href = `/`
        // })

        // formCalendarModal.addEventListener('submit', function(e) {
        //     e.preventDefault()

        //     const formData = new FormData(formCalendarModal)

        //     fetch(formCalendarModal.action, {
        //         method: 'POST',
        //         body: formData,
        //       })
        //       .then(response => {
        //         window.location.href = `/`;
        //       })
        //       .catch(error => {
        //         console.error(error);
        //       });
        // })

    },
    renderNotification: function () {
        
        var notificationHTML = `
            <div class="notification">
                <img src="" alt=""/>
                    <div class="text">
                        <p>
                            <span class="name">Nhóm 12 - Đồ án Tốt nghiệp</span>
                            yêu cầu meeting
                        </p>
                        <p class="time">1 giờ trước</p>
                </div>
            </div>
        `

        const meetings = allMeetingsData.meeting

        for (let i = 0; i < meetings.length; i++) {
            let createdTime = formatDate(formatDateFromUTCToLocal(meetings[i].created_at))
            console.log(createdTime)

            let notificationHTML = `
            <div class="notification">
                <img src="" alt=""/>
                    <div class="text">
                        <p>
                            <span class="name">Group ${meetings[i].group_id % 100} - ${meetings[i].coursename}</span>
                            yêu cầu meeting
                        </p>
                        <p class="time">1 giờ trước</p>
                </div>
            </div>
            `
        }

        
    },
    start: async function () {
        await this.API()
        this.config()
        this.handle()
        this.render()
    }
}

const modalAddFreeTime = {
    inputStartTime: null,
    inputEndTime: null,
    form: null,
    config: function () {
        var text = `
        <form method="POST" action="freetime/create" class="addfreetime">
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
        this.config();
        this.handle();
    }
}

modalAddFreeTime.start();
modalAddCalendar.start()

export { modalAddCalendar, modalAddFreeTime }