import { fetchData } from '../services/fetchData.js'
import { putRequest } from '../services/putRequest.js'
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
let meetings = Array.from($$('.meeting'))
let btnsOut = Array.from($$('.btn-out'))
let dateTime = Array.from($$('.date'))
let editors = Array.from($$('.editor'))
let meetingId = document.querySelector('input[name="meeting_id"]').getAttribute('value')
let note = []
let meetingData
let allMeetingsData
let generalData



const monthMapping = {
    jan: '1',
    feb: '2',
    mar: '3',
    apr: '4',
    may: '5',
    jun: '6',
    jul: '7',
    aug: '8',
    sep: '9',
    oct: '10',
    nov: '11',
    dec: '12',
}

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

        [meetingData] = await getData(`/meeting/api/?id=${meetingId}`) // destructuring 

        generalData = await getData(`/meeting/api/general`)
        
        // allMeetingsData dùng trực tiếp ko try catch (nguy hiểm)
        // chứa 2 bảng kiểu object là groupstudent và meeting
        allMeetingsData = await fetchData('/meeting/api/all')
    },
    config: function () {
        var addMeetingHTML = `
        <div class="modal md-display-meeting">
            <div class="modal-header">
                <h3 class="title">Hiển thị cuộc họp</h3>
                <button class="btn btn-close-display-meeting"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body">
                <form method="GET" action="">
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
                                <tr class="table-header">
                                    <th class="cell">
                                        <div class="">
                                            <input class="check-all-input" type="checkbox" name="groupIds[]" value="this.id">
                                        </div>
                                    </th>
                                    <th class="cell">#</th>
                                    <th class="cell">Nhóm/Họ và tên</th>
                                    <th class="cell">MSSV</th>
                                    <th class="cell">Học phần</th>
                                    <th class="cell">Thời gian</th>
                                    <th class="cell">Đề tài</th>
                                </tr>
                                <tr class="table-row">
                                    <td class="cell">
                                        <div class="">
                                            <input class="check-input" type="checkbox" name="groupIds[]" value="this.id">
                                        </div>
                                    </td>
                                    <td class="cell">1</td>
                                    <td class="cell name">this.fullname</td>
                                    <td class="cell student-id">this.student_id</td>
                                    <td class="cell course-id">course-id</td>
                                    <td class="cell time">time</td>
                                    <td class="cell project-name">project-name</td>
                                </tr>
                                <tr class="table-row">
                                    <td class="cell">
                                        <div class="">
                                            <input class="check-input" type="checkbox" name="groupIds[]" value="this.id">
                                        </div>
                                    </td>
                                    <td class="cell">1</td>
                                    <td class="cell name">this.fullname</td>
                                    <td class="cell student-id">this.student_id</td>
                                    <td class="cell course-id">course-id</td>
                                    <td class="cell time">time</td>
                                    <td class="cell project-name">project-name</td>
                                </tr>
                                <tr class="table-row">
                                    <td class="cell">
                                        <div class="">
                                            <input class="check-input" type="checkbox" name="groupIds[]" value="this.id">
                                        </div>
                                    </td>
                                    <td class="cell">1</td>
                                    <td class="cell name">this.fullname</td>
                                    <td class="cell student-id">this.student_id</td>
                                    <td class="cell course-id">course-id</td>
                                    <td class="cell time">time</td>
                                    <td class="cell project-name">project-name</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
        `
        containerDisplayNewMeeting.innerHTML = addMeetingHTML

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

        // End meeting button: PUT Request to store note and end meeting
        btnModalEndMeeting.addEventListener('click', btn => {
            btn.preventDefault()

            const formData = new FormData(meetingForm)
            const meetingNote = editors[0].firstChild.innerHTML

            formData.append('note', meetingNote)

            putRequest(`/meeting/${meetingData.meeting_id}/end`, formData)

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

            putRequest(`/meeting/${meetingData.meeting_id}/end`, formData)

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

        // Format date from Date object to dd/mm/yyyy
        function formatDate(dateTime) {
            let year = dateTime.substring(11, 16)
            let month = dateTime.substring(4, 7).toLowerCase()
            month = monthMapping[month]
            let date = dateTime.substring(8, 10)
            return date + '/' + month + '/' + year
        }
    },
    renderModalAddMeeting: function () {

        const termSelectTag = containerDisplayNewMeeting.querySelector('#term')
        const courseIdSelectTag = containerDisplayNewMeeting.querySelector('#course_id')
        const groupIdSelectTag = containerDisplayNewMeeting.querySelector('#group_id')

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
            const selectedTerm = termSelectTag.options[termSelectTag.selectedIndex]
            console.log("Đã chọn kỳ: " + selectedTerm.value)

            for (let i = 0; i < generalData.courseIdDB.length; i++) {
                let optionElement = document.createElement("option")
                if (generalData.courseIdDB[i].term == selectedTerm.value) {
                    optionElement.text = generalData.courseIdDB[i].course_id
                    optionElement.value = generalData.courseIdDB[i].course_id
                    courseIdSelectTag.add(optionElement)
                }
            }
        })

        courseIdSelectTag.addEventListener('change', function() {
            groupIdSelectTag.innerHTML = `
                <option value="" disabled selected>Nhóm</option>
            `
            const selectedCourseId = courseIdSelectTag.options[courseIdSelectTag.selectedIndex]
            console.log("Đã chọn học phần: " + selectedCourseId.value)

            for (let i = 0; i < allMeetingsData.groupstudent.length; i++) {
                let optionElement = document.createElement("option")
                if (allMeetingsData.groupstudent[i].course_id == selectedCourseId.value) {
                    optionElement.text = allMeetingsData.groupstudent[i].group_id
                    optionElement.value = allMeetingsData.groupstudent[i].group_id
                    groupIdSelectTag.add(optionElement)
                }
            }
        })

        groupIdSelectTag.addEventListener('change', function() {
            
        })

        


    },
    start: async function () {
        this.config()
        await this.API()
        this.handleEvents()
        await this.renderMeeting()
        this.renderModalAddMeeting()
    }
}

meeting.start()