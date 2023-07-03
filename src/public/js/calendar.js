import { modalAddCalendar } from "./header.js"
import { fetchData } from '../services/fetchData.js'



// variable
let currentDate = new Date()

// css selector
var events = Array.from($$('.event'))
const btnPrevWeek = $('.btn-prev-week')
const btnNextWeek = $('.btn-next-week')
const btnToday = $('.btn-today')
const worksColumn = Array.from($$('.works'))
const workBoxes = Array.from($$('.work-box'))
const datePicker = flatpickr('.btn-change-week', {
    mode: "single",
    defaultDate: "today",
    altInput: true,
    altFormat: "F Y",
    dateFormat: "Y-m-d",
})


const currentDays = [
    $('.works[name="monday"]'),
    $('.works[name="tuesday"]'),
    $('.works[name="wednesday"]'),
    $('.works[name="thursday"]'),
    $('.works[name="friday"]'),
    $('.works[name="saturday"]'),
    $('.works[name="sunday"]'),
]

let eventsAPI

const calendar = {

    API: async function() {
        async function getEvents() {
            try{
                const event = await fetchData(`/event/api`)
                return 
            } catch (err) {
                console.log(err)
            }
        }

        eventsAPI = [await getEvents()] // destructuring
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
                const make_calendar_container = $('.make-calendar.container')
                make_calendar_container.classList.add('show');

                // render startTime vào flatpickr
                const startTime = new Date(`${workBox.target.parentNode.getAttribute('date')} ${convertTime(Number(workBox.target.getAttribute('time')))}`)
                const inputStartTimeInstance = modalAddCalendar.inputStartTime
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
            if(tempEvent.length != 0) {
                eventInCurWeek.push(...tempEvent)
            }
        }
        
        eventInCurWeek.forEach(function (event) {
            event.classList.add('active')
        })

        events.forEach(function (event) {
            event.addEventListener('click', () =>
                window.location.href = `/meeting/?id=${event.getAttribute('id')}`
            )

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