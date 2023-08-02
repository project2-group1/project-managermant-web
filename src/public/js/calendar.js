import { modalAddCalendar } from "./header.js"
import { fetchData } from '../services/fetchData.js'
import { sendRequest } from '../services/sendRequest.js'

// variable
let currentDate = new Date()

// css selector
var events = Array.from($$('.event'))
const btnPrevWeek = $('.btn-prev-week')
const btnNextWeek = $('.btn-next-week')
const btnToday = $('.btn-today')
const make_calendar_container = $('.make-calendar.container')
const worksColumn = Array.from($$('.works'))
const workBoxes = Array.from($$('.work-box'))
let eventsAPI
let user
const datePicker = flatpickr('.btn-change-week', {
    mode: "single",
    defaultDate: "today",
    altInput: true,
    altFormat: "F Y",
    dateFormat: "Y-m-d",
})

const modalMeetingOptionsContainer = $('.modal-meeting-options-container')


const currentDays = [
    $('.works[name="monday"]'),
    $('.works[name="tuesday"]'),
    $('.works[name="wednesday"]'),
    $('.works[name="thursday"]'),
    $('.works[name="friday"]'),
    $('.works[name="saturday"]'),
    $('.works[name="sunday"]'),
]


const calendar = {

    API: async function () {
        async function getData(URL) {
            try {
                const data = await fetchData(URL)
                return data
            } catch (err) {
                console.log(err)
            }
        }

        eventsAPI = await getData(`/event/api`)
        user = await getData('/me/user')
    },
    config: function () {


    },
    loadEvents: function () {
        // get works-col element by (date)
        function getWorkColumn(date) {
            return worksColumn.find((workCol) => (workCol.getAttribute('date') === date))
        }

        // get work-box element by (date, startTime)
        function getWorkBox(date, startTime) {
            let curWork = getWorkColumn(date)
            if (curWork) {
                let workBox = Array.from(curWork.children)
                    .find((workBox) => ((Number)(workBox.getAttribute('time')) === (startTime - 0.5)))
                return workBox
            }
        }

        // set Height of event follow by duration
        function setEventDuration(event) {
            let duration = ((Number)(event.getAttribute('endTime'))
                - (Number)(event.getAttribute('startTime'))) / 0.5
            return duration * 40.8 - 1 + 'px'
        }



        const eventContainer = Array.from($$('.event'))

        // Render event to calendar
        for (let i = 0; i < eventContainer.length; i++) {
            let workBox = getWorkBox(eventContainer[i].getAttribute('date'), eventContainer[i].getAttribute('startTime'))

            // render lần đầu
            if (workBox) {
                if (workBox.nextElementSibling && !workBox.nextElementSibling.classList.contains("event")) {
                    workBox.insertAdjacentElement('afterend', eventContainer[i])
                    eventContainer[i].style.height = setEventDuration(eventContainer[i])
                }
            }
        }

        events = Array.from($$('.event')) //update lại events
    },
    handleResizeWorkBox: function () {
        let workBoxWidth = workBoxes[0].offsetWidth;
        events.forEach((e) => {
            e.style.width = `${workBoxWidth * 0.9}` + "px";
        });
    },
    handleEvents: function () {
        const _this = this // trỏ vào calendar


        // Xử lý sự kiện thay đổi trong lịch tháng
        datePicker.set('onChange', function (selectedDates, dateStr, instance) {
            currentDate = selectedDates[0]
            _this.renderWeek(currentDate)
            _this.renderEvents()

        });

        // Xử lý sự kiện nút tuần trước
        btnPrevWeek.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 7)
            _this.renderWeek(currentDate)
            _this.renderEvents()
            datePicker.setDate(currentDate)
        })

        // Xử lý sự kiện nút tuần tiếp theo

        btnNextWeek.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 7)
            _this.renderWeek(currentDate)
            _this.renderEvents()
            datePicker.setDate(currentDate)
        })


        // Xử lý sự kiện nút trở về hôm nay
        btnToday.addEventListener('click', () => {
            let today = new Date()
            _this.renderWeek(today)
            _this.renderEvents()
            datePicker.setDate(today)
            currentDate = today
        })

        // Chuyển đổi thời gian cho đúng chuyển đề hiện thị ra placeholder
        const convertTime = function (time) {
            var hours = parseInt(time);
            var minutes = (time - hours) * 60;
            var midifyMinitues = minutes.toString().padStart(2, '0')
            var midifyHours = hours.toString().padStart(2, '0')
            return `${midifyHours}:${midifyMinitues}`;
        };

        // Xử lý bật tạo lịch khi bấm vào work box
        workBoxes.forEach(function (workBox) {
            workBox.addEventListener('click', (workBox) => {
                make_calendar_container.classList.add('show')

                // render startTime vào flatpickr
                const startTime = new Date(`${workBox.target.parentNode.getAttribute('date')} ${convertTime(Number(workBox.target.getAttribute('time')))}`)
                const inputStartTimeInstance = modalAddCalendar.inputStartTime
                console.log(inputStartTimeInstance);
                inputStartTimeInstance.setDate(startTime)

                // render endTime vào flatpickr
                const endTime = startTime.setMinutes(startTime.getMinutes() + 30)
                const inputEndTimeInstance = modalAddCalendar.inputEndTime
                inputEndTimeInstance.setDate(endTime)

                // render reportTime vào flatpickr
                const reportTime = startTime.setHours(0)
                const inputReportTimeInstance = modalAddCalendar.inputReportTime
                inputReportTimeInstance.setDate(reportTime)
            })
        })

        // add resize when size of browser changed
        window.addEventListener("resize", () => this.handleResizeWorkBox())
        // add resize khi load content
        window.addEventListener("DOMContentLoaded", this.handleResizeWorkBox())

        // @Overide btnSidebar
        btnSidebar.onclick = function () {
            if (wrapperSidebar.classList.contains('hidden')) {
                wrapperSidebar.classList.remove('hidden')
                wrapperContent.classList.remove('fullwidth')
            }
            else {
                wrapperSidebar.classList.add('hidden')
                wrapperContent.classList.add('fullwidth')
            }
            _this.handleResizeWorkBox()
        }

    },
    // renderWeek tuần làm việc và gán các value vào để xử lý
    renderWeek: function (date) {
        let firstDayOfWeek = new Date(date);
        firstDayOfWeek.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1))

        let TextWeek = Array.from($$('.text-date'))
        let currentDates = [] // mả ng lưu tuần hiện tại

        let temp = new Date(firstDayOfWeek)
        for (let i = 0; i < 7; i++) {
            let cur = new Date(temp)
            currentDates.push(cur)
            temp.setDate(temp.getDate() + 1)
        }

        // renderWeek ra ngày trong tuần trên row-date
        for (let i = 0; i < TextWeek.length; i++) {
            TextWeek[i].innerText = currentDates[i].getDate()
        }

        // render Day để active css
        TextWeek.forEach((e) => {
            e.parentNode.classList.remove('active')
            if (e.innerText == date.getDate()) {
                e.parentNode.classList.add('active')
            }
        })

        // Format lại date hiển thị dạng [YYYY-MM-DD]
        const formattedDates = currentDates.map((date) => {
            let d = date.getDate();
            let m = date.getMonth() + 1;
            let y = date.getFullYear();
            return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        });

        // set thuộc tính date cho các works column để xử lý dữ liệu
        for (let i = 0; i < currentDays.length; i++) {
            currentDays[i].setAttribute('date', formattedDates[i])
        }

        worksColumn.forEach((e) => {
            e.classList.remove('active')
            if (e.getAttribute('date').slice(-2) == date.getDate()) {
                e.classList.add('active')
            }
        })

    },
    renderEvents: function () {

        this.loadEvents()
        // Reset Event
        events.forEach((event) => event.classList.remove('active'))



        // Render events
        function getEvents(date) {
            return events.filter((event) => (event.getAttribute('date') === date))
        }

        let eventInCurWeek = []
        for (let i = 0; i < currentDays.length; i++) {
            let tempEvent = getEvents(currentDays[i].getAttribute('date'))
            if (tempEvent.length != 0) {
                eventInCurWeek.push(...tempEvent)
            }
        }

        eventInCurWeek.forEach(function (event) {
            event.classList.add('active')

            for (let i = 0; i < eventsAPI.length; i++) {
                const e = eventsAPI[i];
                if (event.getAttribute('id') == e.meeting_id) {
                    if (e.state == 'finished') {
                        event.classList.add('finished')
                    }
                    else if (e.state == 'reschedule') {
                        event.classList.add('reschedule')
                    }
                }
            }
        })

        events.forEach(function (event) {
            event.addEventListener('click', async () => {
                const id = event.getAttribute('id')
                if (user.role === 'giang_vien') {

                    const stateModalMap = {
                        pending: 'chưa bắt đầu',
                        ongoing: '',
                        finished: 'đã kết thúc',
                        reschedule: 'yêu cầu thay đổi lịch hẹn'
                    }

                    for (let i = 0; i < eventsAPI.length; i++) {
                        const element = eventsAPI[i]
                        if (element.meeting_id == id) {
                            console.log(element)
                            const startTime = formatDateFromUTCToLocal(element.starttime)
                            const endTime = formatDateFromUTCToLocal(element.endtime)
                            const reportTime = formatDateFromUTCToLocal(element.reportdeadline)
                            if (element.state == 'pending') {
                                let modalMeetingOptionsHTML = `
                                <div class="modal-meeting-options">
                                    <div class="modal-header">
                                        <h3 class="title">Thông tin cuộc họp</h3>
                                        <button class="btn btn-close-modal"><i class="fa-solid fa-xmark"></i></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <h4>Nhóm ${element.group_id % 1000} - ${element.coursename} - ${element.projectname} - #${element.meeting_id % 100}</h4>
                                        </div>
                                        <div class="row">
                                            <p>Thời gian: ${formatDate(startTime)} - ${formatDate(endTime)}</p>
                                        </div>
                                        <div class="row">
                                            <p>Thời hạn báo cáo: ${formatDate(reportTime)}</p>
                                        </div>
                                        <div class="row">
                                            <p>Tiêu đề: ${element.title}</p>
                                        </div>
                                        <div class="row">
                                            <p>Yêu cầu</p>
                                            <textarea class="require readonly" readonly>${element.require_meeting}</textarea>
                                        </div>
                                        <div class="row">
                                            <p>Trạng thái: ${stateModalMap[element.state]}</p>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="options">
                                            <button class="button start">Bắt đầu cuộc họp</button>
                                            <button class="button delete">Xóa cuộc họp</button>
                                            <button class="button change">Thay đổi lịch họp</button>
                                            <div class="modal-reqest-change-meeting modal-body">
                                                <h4>Yêu cầu rời lịch</h4>
                                                <div class="row">
                                                    <p class="p-time">Bắt đầu</p>
                                                    <input class="input-time change-start-time" type="text" id="start_time" name="start_time">
                                                    <div class="modal-flatpickr"></div>
                                                </div>
                                                <div class="row">
                                                    <p class="p-time">Kết thúc</p>
                                                    <input class="input-time change-end-time" type="text" id="end_time" name="end_time">
                                                </div>
                                                <div class="row">
                                                    <p class="p-time">Hạn Báo cáo</p>
                                                    <input class="input-time change-report-time" type="text" id="report_time" name="report_time">
                                                </div>
                                                <div class="row">
                                                    <div class="reason">
                                                        <input class="input-reason" type="text" placeholder="Lý do..." name="reason_reschedule" required>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <input class="button btn-send-request" type="submit">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `
                                modalMeetingOptionsContainer.innerHTML = modalMeetingOptionsHTML
                                modalMeetingOptionsContainer.classList.add('show')

                                const btnStart = $('.button.start')
                                const btnChange = $('.button.change')
                                const btnDelete = $('.button.delete')
                                const btnCloseModal = $('.btn-close-modal')

                                btnCloseModal.addEventListener('click', () => {
                                    modalMeetingOptionsContainer.classList.remove('show')
                                })

                                btnStart.addEventListener('click', () => {
                                    window.location.href = `/meeting/${element.meeting_id}`
                                })

                                const btnSendRequest = $('.btn-send-request')
                                let inputStartChangeTime
                                let inputEndChangeTime
                                let inputReportChangeTime
                                let selectedStartDate
                                let selectedEndDate
                                let selectedReportDate
                                btnChange.addEventListener('click', () => {
                                    const modalReqestChangeMeeting = $('.modal-reqest-change-meeting')
                                    modalReqestChangeMeeting.classList.toggle('show')
                                    // [DELETE] /meeting/delete/:id - delete meeting
                                    // sendRequest(`/meeting/delete/${element.meeting_id}`, 'DELETE', null)

                                    inputStartChangeTime = flatpickr('.change-start-time', {
                                        enableTime: true,
                                        defaultDate: "today",
                                        dateFormat: "Y-m-d H:i",
                                        onChange: function (selectedDates, dateStr, instance) {
                                            selectedStartDate = dateStr;
                                            console.log(selectedStartDate)
                                        },
                                        minuteIncrement: 30,
                                        minTime: "7:00",
                                        maxTime: "18:00"
                                    })

                                    inputEndChangeTime = flatpickr('.change-end-time', {
                                        enableTime: true,
                                        defaultDate: "today",
                                        dateFormat: "Y-m-d H:i",
                                        onChange: function (selectedDates, dateStr, instance) {
                                            selectedEndDate = dateStr;
                                            console.log(selectedEndDate)
                                        },
                                        minuteIncrement: 30,
                                        minTime: "7:00",
                                        maxTime: "18:00"
                                    })

                                    inputReportChangeTime = flatpickr('.change-report-time', {
                                        enableTime: true,
                                        defaultDate: "today",
                                        dateFormat: "Y-m-d H:i",
                                        onChange: function (selectedDates, dateStr, instance) {
                                            selectedReportDate = dateStr;
                                            console.log(selectedReportDate)
                                        },
                                        minuteIncrement: 30,
                                    })

                                    inputStartChangeTime.setDate(startTime)
                                    inputEndChangeTime.setDate(endTime)
                                    inputReportChangeTime.setDate(reportTime)
                                })

                                btnSendRequest.addEventListener('click', (e) => {
                                    const inputReason = $('.input-reason')
                                    let requestData = {
                                        meeting_id: element.meeting_id,
                                        starttime: selectedStartDate,
                                        endtime: selectedEndDate,
                                        reportdeadline: selectedReportDate,
                                        reason: inputReason.value,
                                    }
                                    let isValid = true

                                    if (inputReason.value.trim() === '' || !selectedStartDate || !selectedEndDate || !selectedReportDate) {
                                        isValid = false

                                        alert(`GV - Thời gian chưa thay đổi hoặc chưa có lý do`)
                                    }

                                    if (isValid) {
                                        sendRequest(`/meeting/reschedule/${element.meeting_id}`, 'PUT', JSON.stringify(requestData))
                                        window.location.href = '/'
                                    }
                                })

                                btnDelete.addEventListener('click', () => {
                                    // [DELETE] /meeting/delete/:id - delete meeting
                                    sendRequest(`/meeting/delete/${element.meeting_id}`, 'DELETE', null)
                                    window.location.href = '/'
                                })
                            }
                            else if (element.state == 'reschedule') {
                                const [reqReschedule] = await fetchData(`/meeting/reqchange/${element.meeting_id}`)
                                const changeStartTime = formatDateFromUTCToLocal(reqReschedule.starttime)
                                const changeEndTime = formatDateFromUTCToLocal(reqReschedule.endtime)
                                const changeReportTime = formatDateFromUTCToLocal(reqReschedule.reportdeadline)
                                let modalMeetingOptionsHTML = `
                                    <div class="modal-meeting-options">
                                        <div class="modal-header">
                                            <h3 class="title">Thông tin cuộc họp</h3>
                                            <button class="btn btn-close-modal"><i class="fa-solid fa-xmark"></i></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <h4>Nhóm ${element.group_id % 1000} - ${element.coursename} - ${element.projectname} - #${element.meeting_id % 100}</h4>
                                            </div>
                                            <div class="row">
                                                <p>Thời gian ban đầu: ${formatDate(startTime)} - ${formatDate(endTime)}</p>
                                            </div>
                                            <div class="row">
                                                <p>Thời hạn báo cáo: ${formatDate(reportTime)}</p>
                                            </div>
                                            <div class="row">
                                                <p>Tiêu đề: ${element.title}</p>
                                            </div>
                                            <div class="row">
                                                <p>Yêu cầu</p>
                                                <textarea class="require readonly" readonly>${element.require_meeting}</textarea>
                                            </div>
                                            <div class="row">
                                                <p>Trạng thái: ${stateModalMap[element.state]}</p>
                                                <p>Lý do: ${reqReschedule.reason_reschedule}</p>
                                                <p>Thời gian thay đổi: ${formatDate(changeStartTime)} - ${formatDate(changeEndTime)}</p>
                                                <p>Hạn báo cáo: ${formatDate(changeReportTime)}</p>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <div class="options">
                                                <button class="button accept">Chấp nhận đổi lịch</button>
                                                <button class="button refuse">Từ chối đổi lịch</button>
                                                <button class="button change">Đổi lịch họp khác</button>
                                                <div class="modal-reqest-change-meeting modal-body">
                                                    <h4>Yêu cầu rời lịch</h4>
                                                    <div class="row">
                                                        <p class="p-time">Bắt đầu</p>
                                                        <input class="input-time change-start-time" type="text" id="start_time" name="start_time">
                                                        <div class="modal-flatpickr"></div>
                                                    </div>
                                                    <div class="row">
                                                        <p class="p-time">Kết thúc</p>
                                                        <input class="input-time change-end-time" type="text" id="end_time" name="end_time">
                                                    </div>
                                                    <div class="row">
                                                        <p class="p-time">Hạn Báo cáo</p>
                                                        <input class="input-time change-report-time" type="text" id="report_time" name="report_time">
                                                    </div>
                                                    <div class="row">
                                                        <div class="reason">
                                                            <input class="input-reason" type="text" placeholder="Lý do..." name="reason_reschedule" required>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <input class="button btn-send-request" type="submit">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `
                                modalMeetingOptionsContainer.innerHTML = modalMeetingOptionsHTML
                                modalMeetingOptionsContainer.classList.add('show')

                                const btnCloseModal = $('.btn-close-modal')
                                const btnAccept = $('.button.accept')
                                const btnRefuse = $('.button.refuse')
                                const btnChange = $('.button.change')

                                btnCloseModal.addEventListener('click', () => {
                                    modalMeetingOptionsContainer.classList.remove('show')
                                })

                                reqReschedule.starttime = formatDateSendToDatabase(formatDateFromUTCToLocal(reqReschedule.starttime))
                                reqReschedule.endtime = formatDateSendToDatabase(formatDateFromUTCToLocal(reqReschedule.endtime))
                                reqReschedule.reportdeadline = formatDateSendToDatabase(formatDateFromUTCToLocal(reqReschedule.reportdeadline))
                                console.log(reqReschedule)
                                btnAccept.addEventListener('click', () => {
                                    sendRequest(`/meeting/acceptchange/${element.meeting_id}`, 'PUT', JSON.stringify(reqReschedule))
                                    window.location.href = '/'
                                })

                                btnRefuse.addEventListener('click', () => {
                                    sendRequest(`/meeting/refusechange/${element.meeting_id}`, 'PUT')
                                    window.location.href = '/'
                                })

                                btnChange.addEventListener('click', () => {

                                })
                            }
                            else if (element.state == 'finished') {
                                let modalMeetingOptionsHTML = `
                                    <div class="modal-meeting-options">
                                        <div class="modal-header">
                                            <h3 class="title">Thông tin cuộc họp</h3>
                                            <button class="btn btn-close-modal"><i class="fa-solid fa-xmark"></i></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <h4>Nhóm ${element.group_id % 1000} - ${element.coursename} - ${element.projectname} - #${element.meeting_id % 100}</h4>
                                            </div>
                                            <div class="row">
                                                <p>Thời gian ban đầu: ${formatDate(startTime)} - ${formatDate(endTime)}</p>
                                            </div>
                                            <div class="row">
                                                <p>Thời hạn báo cáo: ${formatDate(reportTime)}</p>
                                            </div>
                                            <div class="row">
                                                <p>Tiêu đề: ${element.title}</p>
                                            </div>
                                            <div class="row">
                                                <p>Yêu cầu</p>
                                                <textarea class="require readonly" readonly>${element.require_meeting}</textarea>
                                            </div>
                                            <div class="row">
                                                <p>Trạng thái: ${stateModalMap[element.state]}</p>
                                            </div>
                                        </div>
                                    </div>
                                `
                                modalMeetingOptionsContainer.innerHTML = modalMeetingOptionsHTML
                                modalMeetingOptionsContainer.classList.add('show')

                                const btnCloseModal = $('.btn-close-modal')

                                btnCloseModal.addEventListener('click', () => {
                                    modalMeetingOptionsContainer.classList.remove('show')
                                })
                            }
                        }
                    }
                }
                else if (user.role === 'sinh_vien') {
                    const stateModalMap = {
                        pending: 'chưa bắt đầu',
                        ongoing: '',
                        finished: 'đã kết thúc',
                        reschedule: 'đã yêu cầu thay đổi lịch hẹn'
                    }

                    for (let i = 0; i < eventsAPI.length; i++) {
                        const element = eventsAPI[i]
                        if (element.meeting_id == id) {
                            console.log(element)
                            const startTime = formatDateFromUTCToLocal(element.starttime)
                            const endTime = formatDateFromUTCToLocal(element.endtime)
                            const reportTime = formatDateFromUTCToLocal(element.reportdeadline)
                            console.log(reportTime)
                            let modalMeetingOptionsHTML = `
                            <div class="modal-meeting-options">
                                <div class="modal-header">
                                    <h3 class="title">Thông tin cuộc họp</h3>
                                    <button class="btn btn-close-modal"><i class="fa-solid fa-xmark"></i></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <h4>Nhóm ${element.group_id % 1000} - ${element.coursename} - ${element.projectname} - #${element.meeting_id % 100}</h4>
                                    </div>
                                    <div class="row">
                                        <p>Thời gian: ${formatDate(startTime)} - ${formatDate(endTime)}</p>
                                    </div>
                                    <div class="row">
                                        <p>Thời hạn báo cáo: ${formatDate(reportTime)}</p>
                                    </div>
                                    <div class="row">
                                        <p>Tiêu đề: ${element.title}</p>
                                    </div>
                                    <div class="row">
                                        <p>Yêu cầu</p>
                                        <textarea class="require readonly" readonly>${element.require_meeting}</textarea>
                                    </div>
                                    <div class="row">
                                        <p>Trạng thái: ${stateModalMap[element.state]}</p>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <div class="options">
                                        <button class="button start">Vào cuộc họp</button>
                                        <button class="button change">Yêu cầu đổi lịch</button>
                                    </div>
                                </div>
                                <div class="modal-reqest-change-meeting modal-body">
                                    <h4>Yêu cầu rời lịch</h4>
                                    <div class="row">
                                        <p class="p-time">Bắt đầu</p>
                                        <input class="input-time change-start-time" type="text" id="start_time" name="start_time">
                                        <div class="modal-flatpickr"></div>
                                    </div>
                                    <div class="row">
                                        <p class="p-time">Kết thúc</p>
                                        <input class="input-time change-end-time" type="text" id="end_time" name="end_time">
                                    </div>
                                    <div class="row">
                                        <p class="p-time">Hạn báo cáo</p>
                                        <input class="input-time change-report-time" type="text" id="report_time" name="report_time">
                                    </div>
                                    <div class="row">
                                        <div class="reason">
                                            <input class="input-reason" type="text" placeholder="Lý do..." name="reason_reschedule" required>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <input class="button btn-send-request" type="submit">
                                    </div>
                                </div>
                            </div>
                        `
                            modalMeetingOptionsContainer.innerHTML = modalMeetingOptionsHTML
                            modalMeetingOptionsContainer.classList.add('show')

                            const btnStart = $('.button.start')
                            const btnChange = $('.button.change')
                            const btnCloseModal = $('.btn-close-modal')
                            const inputReason = $('.input-reason')
                            btnCloseModal.addEventListener('click', () => {
                                modalMeetingOptionsContainer.classList.remove('show')
                            })

                            btnStart.addEventListener('click', () => {
                                window.location.href = `/meeting/${element.meeting_id}`
                            })

                            const btnSendRequest = $('.btn-send-request')
                            let inputStartChangeTime
                            let inputEndChangeTime
                            let inputReportChangeTime
                            let selectedStartDate
                            let selectedEndDate
                            let selectedReportDate
                            btnChange.addEventListener('click', () => {
                                const modalReqestChangeMeeting = $('.modal-reqest-change-meeting')
                                modalReqestChangeMeeting.classList.toggle('show')

                                inputStartChangeTime = flatpickr('.change-start-time', {
                                    enableTime: true,
                                    defaultDate: "today",
                                    dateFormat: "Y-m-d H:i",
                                    onChange: function (selectedDates, dateStr, instance) {
                                        selectedStartDate = dateStr;
                                        console.log(selectedStartDate)
                                    },
                                    minuteIncrement: 30,
                                    minTime: "7:00",
                                    maxTime: "18:00"
                                })

                                inputEndChangeTime = flatpickr('.change-end-time', {
                                    enableTime: true,
                                    defaultDate: "today",
                                    dateFormat: "Y-m-d H:i",
                                    onChange: function (selectedDates, dateStr, instance) {
                                        selectedEndDate = dateStr;
                                        console.log(selectedEndDate)
                                    },
                                    minuteIncrement: 30,
                                    minTime: "7:00",
                                    maxTime: "18:00"
                                })

                                inputReportChangeTime = flatpickr('.change-report-time', {
                                    enableTime: true,
                                    defaultDate: "today",
                                    dateFormat: "Y-m-d H:i",
                                    onChange: function (selectedDates, dateStr, instance) {
                                        selectedReportDate = dateStr;
                                        console.log(selectedReportDate)
                                    },
                                    minuteIncrement: 30,
                                })

                                inputStartChangeTime.setDate(startTime)
                                inputEndChangeTime.setDate(endTime)
                                inputReportChangeTime.setDate(reportTime)
                            })

                            btnSendRequest.addEventListener('click', (e) => {
                                let requestData = {
                                    meeting_id: element.meeting_id,
                                    start_time: selectedStartDate,
                                    end_time: selectedEndDate,
                                    report_time: selectedReportDate,
                                    reason: inputReason.value,
                                }
                                let isValid = true

                                if (inputReason.value.trim() === '' || !selectedStartDate || !selectedEndDate || !selectedReportDate) {
                                    isValid = false

                                    alert(`Thời gian chưa thay đổi hoặc chưa có lý do`)
                                }


                                if (isValid) {

                                    sendRequest(`/meeting/reqchange/${element.meeting_id}`, 'PUT', JSON.stringify(requestData))
                                    window.location.href = '/'
                                }
                            })
                        }
                    }
                }

            })

            let curHeight
            event.addEventListener('mouseenter', (e) => {
                curHeight = e.target.clientHeight
                if (e.target.scrollHeight > e.target.clientHeight) {
                    e.target.style.height = e.target.scrollHeight + 'px'
                }
            })

            event.addEventListener('mouseleave', (e) => {
                e.target.style.height = curHeight + 'px'
            })
        })

        // resize WorkBox width
        this.handleResizeWorkBox()

    },
    start: async function () {
        await this.API()
        this.config()
        this.renderWeek(currentDate)
        this.loadEvents()
        this.renderEvents()
        this.handleEvents()
    },
}

calendar.start()