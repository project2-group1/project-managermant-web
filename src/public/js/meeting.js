import { fetchData } from '../services/fetchData.js'
import { sendRequest } from '../services/sendRequest.js'
import { modalAddCalendar } from './header.js'

// selector
const btnAddMeeting = $('.sidebar-add-meeting')
const btnEndMeeting = $('.btn-end-meeting')
const btnDisplay = $('.btn-display')
const btnDisplayNewMeeting = $('.sidebar-add-meeting')
const containerDisplayNewMeeting = $('.container.display-new-meeting')
const btnModalAddMeeting = $('.btn-add-meeting')
const btnModalEndMeeting = $('.btn-end')
const meetingForm = $('.form-meeting')
let btnCloseDisplayMeeting
let meetingsContainer = Array.from($$('.meeting-container'))
let meetings = Array.from($$('.meeting'))
let btnsOut = Array.from($$('.btn-out'))
let dateTime = Array.from($$('.date'))
let editors = Array.from($$('.editor'))
// let meetingId = $('input[name="meeting_id"]').getAttribute('value')
let displayedMeetingIds = []
let note = []
let btnAcceptNewMeeting
let meetingData
let allMeetingsData
let generalData
let tableRef
let tbodyContainer

const meetingHTML = `
        <div class="meeting-container">
            <form method="POST" class="form-meeting">
                <input type="hidden" name="meeting_id" value="">
                <div class="meeting">
                    <div class="meeting-header">
                        <div class="title">
                            <span class="title-course"></span>
                            <span class="title-space">-</span>
                            <span class="title-name"></span>
                            <span class="title-space">-</span>
                            <span class="title-topic"></span>
                            <span class="title-serial"></span>
                        </div>
                        <div class="header-btn">
                            <button class="btn-out btn-note">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>
                    <div class="meeting-info">
                        <div class="day">
                            <p class="date" starttime="" endtime=""></p>
                        </div>
                        <div class="wrapper-table">
                            <div class="wrap-table">
                                <table class="table">
                                    <tr class="table-header">
                                        <th class="cell">Họ và tên</th>
                                        <th class="cell">MSSV</th>
                                    </tr>
                                    <tr class="table-row">
                                        <td class="cell student-name"></td>
                                        <td class="cell student-id"></td>
                                    </tr>
                                </table>
                            </div>
                            <div class="wrap-table">
                                <table class="table">
                                    <!-- Header row -->
                                    <tr class="table-header">
                                        <th class="cell require">Yêu cầu</th>
                                        <th class="cell report">Báo cáo</th>
                                    </tr>
                                    <!-- Content rows -->
                                    <tr>
                                        <td class="cell fullrow require-meeting"></td>
                                        <td class="cell fullrow report-meeting">
                                            <a class="report-link" href="">Đường dẫn</a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="meeting-content">
                        <div class="editor"></div>
                    </div>
                    <div class="meeting-end">
                        <div class="container-select-modal ">
                            <details>
                                <summary>
                                    <div class="button btn-end-meeting">Kết thúc</div>
                                    <div class="details-modal-overlay"></div>
                                </summary>
                                <div class="details-modal">
                                    <div class="details-modal-close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                                            fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
                                                fill="black" />
                                        </svg>
                                    </div>
                                    <div class="details-modal-title">
                                        <h1>Kết thúc cuộc họp</h1>
                                    </div>
                                    <div class="details-modal-content">
                                        <p>Bạn có thể lựa chọn tạo cuộc họp mới tại đây hoặc kết thúc cuộc họp mà không tạo
                                            mới!</p>
                                        <div class="modal-row">
                                            <button class="button btn-modal btn-add-meeting">Tạo mới</button>
                                            <button class="button btn-modal btn-end">Kết thúc</button>
                                        </div>
                                    </div>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </form>
        </div>`

var addMeetingHTML = `
        <div class="modal md-display-meeting">
            <div class="modal-header">
                <h3 class="title">Hiển thị cuộc họp</h3>
                <button class="btn btn-close-display-meeting"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body">
                    <div class="row">
                        <div class="input-group">
                            <div class="col-third">
                                <h4>Kỳ</h4>
                                <select id="term" name="term" required>
                                    <option value="" disabled selected>Kỳ</option>
                                </select>
                            </div>
                            <div class="col-third">
                                <h4>Học phần</h4>
                                <select id="course_id" name="course_id" required>
                                    <option value="" disabled selected>Học phần</option>
                                </select>
                            </div>
                            <div class="col-third">
                                <h4>Nhóm</h4>
                                <select id="group_id" name="group_id" required>
                                    <option value="" disabled selected>Nhóm</option>
                                </select>
                            </div>
                            <div class="pos-rb-corner">
                                <input type="submit"  class="submit btn-accept" value="Hiển thị cuộc họp">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="wrap-table">
                            <table class="table">
                                <thead>
                                <tr class="table-header">
                                    <th class="cell">
                                        <div class="">
                                            <input class="check-all-input" type="checkbox" name="groupIdAll" value="this.id">
                                        </div>
                                    </th>
                                    <th class="cell">#</th>
                                    <th class="cell">Nhóm/Họ và tên</th>
                                    <th class="cell">MSSV</th>
                                    <th class="cell">Học phần</th>
                                    <th class="cell">Thời gian</th>
                                    <th class="cell">Đề tài</th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </div>
    `

    console.log(window.location.href.slice(-10));

const meeting = {
    API: async function () {
        async function getData(URL) {
            try {
                const responseData = await fetchData(URL)
                return responseData
            } catch (err) {
                console.log(err)
            }
        }

        [meetingData] = await getData(`/meeting/api/${window.location.href.slice(-10)}`) // destructuring 

        // courseId and Term in Database
        generalData = await getData(`/meeting/api/general`)

        // allMeetingsData dùng trực tiếp ko try catch (nguy hiểm)
        // chứa 2 bảng kiểu object là groupstudent và meeting
        allMeetingsData = await fetchData('/meeting/api/all')
    },
    config: function () {

        containerDisplayNewMeeting.innerHTML = addMeetingHTML
        tableRef = $('.table')
        tbodyContainer = tableRef.querySelector('tbody')
        btnAcceptNewMeeting = $('.btn-accept')

        editors = Array.from($$('.editor'))
        btnCloseDisplayMeeting = $('.btn-close-display-meeting')
        // Render quill note for each meeting
        for (let i = 0; i < meetings.length; i++) {

            editors.map((editor, index) => {
                editor.classList.add('editor' + index)
            })

            var quill = new Quill('.editor' + i, {
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false, 3] }],
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered' },
                        { 'list': 'bullet' },
                        { 'align': [] }],
                        [{ 'color': [] }, { 'background': [] }],// dropdown with defaults from theme
                        ['image', 'code-block'],
                    ]
                },
                debug: 'info',
                placeholder: 'Note something...',
                theme: 'snow',
            })
        }


    },
    handleEvents: function () {
        const _this = this

        // UTC: yyyy-mm-ddThh:mm:ss.sssZ
        function formatDateFromUTCToLocal(dataTime) {
            const time = new Date(dataTime)
            const timezoneOffset = time.getTimezoneOffset()
            return new Date(time.getTime() - timezoneOffset * 60)
        }

        btnDisplay.addEventListener('click', () => {
            meetings.map((e) => {
                if (!e.classList.contains('double-screen')) {
                    e.classList.add('double-screen')
                } else {
                    e.classList.remove('double-screen')
                }
            })
        })

        btnDisplayNewMeeting.addEventListener('click', () => {
            containerDisplayNewMeeting.classList.add('show')
        })

        btnCloseDisplayMeeting.addEventListener('click', () => {
            containerDisplayNewMeeting.classList.remove('show')
        })

        editors.forEach((editor) => {
            editor.addEventListener("mousedown", function () {
                this.classList.add("focus");
            })

            editor.addEventListener("blur", function () {
                this.classList.remove("focus");
            })
        })

        console.log(meetingData);
        // End meeting button: PUT Request to store note and end meeting
        console.log(btnModalEndMeeting);
        btnModalEndMeeting.addEventListener('click', btn => {
            btn.preventDefault()
            const meetingNote = editors[0].firstChild.innerHTML

            let requestData = {
                meeting_id: meetingData.meeting_id,
                note_teacher: meetingNote
            }


            sendRequest(`/meeting/end/${meetingData.meeting_id}`, 'PUT', JSON.stringify(requestData))

            window.location.href = '/'

        })

        // Add meeting button: PUT Request to store note and end meeting
        // After that open modal add meeting
        // Auto config time by USER
        btnModalAddMeeting.addEventListener('click', btn => {
            btn.preventDefault()

            const formData = new FormData(meetingForm)
            const meetingNote = editors[0].firstChild.innerHTML

            formData.append('note', meetingNote)

            sendRequest(`/meeting/${meetingData.meeting_id}/end`, 'PUT',formData)

            const btnAddMeeting = $('.make-calendar.container')
            btnAddMeeting.classList.add('show')

            const term = btnAddMeeting.querySelector('#term')
            for (let i = 0; i < term.options.length; i++) {
                if (meetingData.term.toString() === term.options[i].value)
                    term.options[i].selected = true
            }

            const course = btnAddMeeting.querySelector('#course_id')
            for (let i = 0; i < course.options.length; i++) {
                if (meetingData.course_id === course.options[i].value)
                    course.options[i].selected = true
            }

            const group = btnAddMeeting.querySelector('#group_id')
            for (let i = 0; i < group.options.length; i++) {
                if (meetingData.group_id.toString() === group.options[i].value)
                    group.options[i].selected = true
            }

            const startTime = formatDateFromUTCToLocal(meetingData.starttime)
            modalAddCalendar.inputStartTime.setDate(startTime.setDate(startTime.getDate() + 7))

            const endTime = formatDateFromUTCToLocal(meetingData.endtime)
            modalAddCalendar.inputEndTime.setDate(endTime.setDate(endTime.getDate() + 7))

            const reportTime = formatDateFromUTCToLocal(meetingData.reportdeadline)
            modalAddCalendar.inputReportTime.setDate(reportTime.setDate(reportTime.getDate() + 7))
        })



    },
    renderMeeting: function () {
        meetingForm.action = '/meeting/' + `${meetingData.meeting_id}` + '/end'

        // Add event click for btnsOut 
        btnsOut.forEach((btnOut) => {
            btnOut.addEventListener('click', (e) => {
                e.target.closest('.meeting').remove()
            })
        })

        // Render date
        dateTime.forEach((e) => {
            console.log(e.getAttribute('starttime'))
            e.innerText = formatDate(e.getAttribute('starttime')) +
                formatTime(e.getAttribute('starttime')) + ' - ' +
                formatTime(e.getAttribute('endtime'))
        })

        // Format time from Date object to hh:mm
        function formatTime(dateTime) {
            let hourAndMinutes = dateTime.substring(16, 21)
            return hourAndMinutes
        }

        // Override Format date from Date object to dd/mm/yyyy
        function formatDate(dateTime) {
            let year = dateTime.substring(11, 16)
            let month = dateTime.substring(4, 7).toLowerCase()
            month = monthMapping[month]
            let date = dateTime.substring(8, 10)
            return date + '/' + month + '/' + year
        }
    },
    renderMultiplesMeeting: function(meeting) {
        console.log(meeting)

        wrapperContent.insertAdjacentHTML('beforeend', meetingHTML)
        let newMeeting = wrapperContent.lastChild
        
        newMeeting.querySelector('.title-course').innerText = meeting.coursename
        newMeeting.querySelector('.title-name').innerText = `Group ${meeting.group_id % 1000}`
        newMeeting.querySelector('.title-topic').innerText = meeting.projectname
        newMeeting.querySelector('.title-serial').innerText = `#${meeting.meeting_id % 100}`
        newMeeting.querySelector('.date').setAttribute('starttime',convertDate(meeting.starttime))
        newMeeting.querySelector('.date').setAttribute('endtime',convertDate(meeting.endtime))
        newMeeting.querySelector('.require').innerHTML = meeting.require_meeting
        // newMeeting.querySelector('.report').firstChild
        console.log(newMeeting);
        // _this.config()

        meetingsContainer = Array.from($$('.meeting-container'))
    },
    renderModalAddMeeting: function () {
        const _this = this

        const termSelectTag = containerDisplayNewMeeting.querySelector('#term')
        const courseIdSelectTag = containerDisplayNewMeeting.querySelector('#course_id')
        const groupIdSelectTag = containerDisplayNewMeeting.querySelector('#group_id')
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
            tbodyContainer.innerHTML = ""
            selectedGroupId = groupIdSelectTag.options[groupIdSelectTag.selectedIndex]
            console.log("Group: " + selectedGroupId.value)
            let index = 1
            for (let i = 0; i < allMeetingsData.meeting.length; i++) {
                const element = allMeetingsData.meeting[i];

                if (element.meeting_id.toString().substring(0, 5) == selectedTerm.value
                    && element.course_id == selectedCourseId.value
                    && element.group_id == selectedGroupId.value) {
                    console.log(element);
                    _this.renderModalDataTable(element, index++)
                }
            }
            _this.handleModalTable()
        })





    },
    renderModalDataTable: function (curMeetingData, index) {
        // Format date from Date object to dd/mm/yyyy

        function convertDate(dateTime) {
            dateTime = formatDateFromUTCToLocal(dateTime).toString()
            return formatDate(dateTime)
        }

        let tableRowHTML = `
            <tr class="table-row">
                <td class="cell">
                    <div class="">
                        <input class="check-input" type="checkbox" name="groupIds[]" value="${curMeetingData.meeting_id}">
                    </div>
                </td>
                <td class="cell serial">${index}</td>
                <td class="cell name">${curMeetingData.group_id}</td>
                <td class="cell student-id">${curMeetingData.group_id}</td>
                <td class="cell course-id">${curMeetingData.course_id}</td>
                <td class="cell time">${convertDate(curMeetingData.starttime)}</td>
                <td class="cell project-name">${curMeetingData.projectname}</td>
            </tr>
        `


        tbodyContainer.insertAdjacentHTML('beforeend', tableRowHTML)
    },
    handleModalTable: function () {
        const _this = this
        const groupCheckboxAll = $('.check-all-input')
        const groupItemCheckboxes = $$('input[name="groupIds[]"]')
        let groupItemCheckedboxes

        let isCheckAll
        let length = groupItemCheckboxes.length

        groupCheckboxAll.addEventListener('change', function (e) {
            isCheckAll = e.target.checked
            groupItemCheckboxes.forEach((checkbox) => {
                checkbox.checked = isCheckAll
            })
        })

        groupItemCheckboxes.forEach((e) => {
            e.addEventListener('change', function () {
                isCheckAll = length === $$('input[name="groupIds[]"]:checked').length
                groupCheckboxAll.checked = isCheckAll
            })
        })

        btnAcceptNewMeeting.addEventListener('click', function () {
            groupItemCheckedboxes = Array.from($$('input[name="groupIds[]"]:checked'))
            groupItemCheckedboxes.forEach((e) => displayedMeetingIds.push(e.value))
            console.log(displayedMeetingIds)

            groupItemCheckedboxes.forEach((checkbox) => {
                allMeetingsData.meeting.forEach((meeting) => {
                    if(meeting.meeting_id == checkbox.value) {
                        renderMultiplesMeeting(meeting)
                    }
                })
            })

        })



    },
    start: async function () {
        this.config()
        await this.API()
        this.handleEvents()
        this.renderMeeting()
        this.renderModalAddMeeting()

    }
}

meeting.start()