import { fetchData } from '../services/fetchData.js'
import { putRequest } from '../services/putRequest.js'
import { modalAddCalendar } from './header.js'

// selector
const btnAddMeeting = $('.sidebar-add-meeting')
const btnEndMeeting = $('.btn-end-meeting')
const btnDisplay = $('.btn-display')
const btnModalDetail = Array.from($$('.btn-modal'))
const btnModalAddMeeting = $('.btn-add-meeting')
const btnModalEndMeeting = $('.btn-end')
const meetingForm = $('.form-meeting')
let meetings = Array.from($$('.meeting'))
let btnsOut = Array.from($$('.btn-out'))
let dateTime = Array.from($$('.date'))
let editors = Array.from($$('.editor'))
let meetingId = document.querySelector('input[name="meeting_id"]').getAttribute('value')
let note = []
let meetingData



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
        async function getData() {
            try {
                const meetingData = await fetchData(`/meeting/api/?id=${meetingId}`)
                return meetingData
            } catch (err) {
                console.log(err)
            }
        }

        [meetingData] = await getData() // destructuring 
        // console.log(meetingData)

    },
    config: function () {
        // Render quill note for each meeting
        for (let i = 0; i < meetings.length; i++) {

            editors.map((editor, index) => {
                editor.classList.add('editor' + index)
            })

            var quill = new Quill('.editor' + i, {
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false, 3] }],
                        ['bold', 'italic', 'underline'], // object như 1 button đơn lẻ thì chỉ cần truyền vào string
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

        editors.forEach((editor) => {
            editor.addEventListener("mousedown", function () {
                this.classList.add("focus");
            })

            editor.addEventListener("blur", function () {
                this.classList.remove("focus");
            })
        })

        btnModalEndMeeting.addEventListener('click', btn => {
            btn.preventDefault()

            const formData = new FormData(meetingForm)
            const meetingNote = editors[0].firstChild.innerHTML

            formData.append('note', meetingNote)

            putRequest(`/meeting/${meetingData.meeting_id}/end`, formData)
                
            window.location.href = '/'
            
        })

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

            modalAddCalendar.inputStartTime.setDate(formatDateFromUTCToLocal(meetingData.starttime))
            modalAddCalendar.inputEndTime.setDate(formatDateFromUTCToLocal(meetingData.endtime))
            const reportTime = new Date(formatDateFromUTCToLocal(meetingData.reportdeadline))
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

        // Format time from Date object
        function formatTime(dateTime) {
            let hourAndMinutes = dateTime.substring(16, 21)
            return hourAndMinutes
        }

        // Format date from Date object
        function formatDate(dateTime) {
            let year = dateTime.substring(11, 16)
            let month = dateTime.substring(4, 7).toLowerCase()
            month = monthMapping[month]
            let date = dateTime.substring(8, 10)
            return date + '/' + month + '/' + year
        }
    },
    start: async function () {
        this.config()
        await this.API()
        this.handleEvents()
        await this.renderMeeting()
    }
}

meeting.start()