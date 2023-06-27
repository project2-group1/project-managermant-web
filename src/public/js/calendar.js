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
    monday = $('.works[name="monday"]'),
    tuesday = $('.works[name="tuesday"]'),
    wednesday = $('.works[name="wednesday"]'),
    thursday = $('.works[name="thursday"]'),
    friday = $('.works[name="friday"]'),
    saturday = $('.works[name="saturday"]'),
    sunday = $('.works[name="sunday"]'),
]

const calendar = {
    // APM -> Data
    eventsData: [
        {
            date: '2023-05-23',
            startTime: '8',
            endTime: '8.5',
            title: 'Project II - Nhóm 1',
            info: 'Website quản lý Project',
        },
        {
            date: '2023-05-24',
            startTime: '9',
            endTime: '11.5',
            title: 'Đồ án tốt nghiệp II - Nhóm 3',
            info: 'Website quản lý Project',
        },
        {
            date: '2023-05-27',
            startTime: '11',
            endTime: '13',
            title: 'Graduated Research',
            info: 'artificial intelligence project',
        },
        {
            date: '2023-05-29',
            startTime: '9',
            endTime: '11.5',
            title: 'Đồ án tốt nghiệp II - Nhóm 3',
            info: 'Website quản lý Project',
        },
        {
            date: '2023-05-19',
            startTime: '11',
            endTime: '12',
            title: 'Graduated Research',
            info: 'IOT project',
        },
    ],
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

        // render event elements array
        const eventHtmls = this.eventsData.map((event, index) => {
            let start = event.startTime.replace('.5', ':30')
            let end = event.endTime.replace('.5', ':30')
            return `
                <button class="event" date="${event.date}" startTime="${event.startTime}" endTime="${event.endTime}">
                    <div class="content">
                        <p class="title">${event.title}</p>
                        <p class="info">${event.info}</p>
                        <p class="time">${start.includes(':') ? start : (start + ':00')} - ${end.includes(':') ? end : (end + ':00')}</p>
                    </div>
                </button>
            `
        })

        // store in a container
        const container = document.createElement('div')
        container.innerHTML = eventHtmls.join('')

        const eventContainer = Array.from(container.querySelectorAll('.event'))

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

        // Xử lý bật tạo lịch khi bấm vào work box
        workBoxes.forEach(function (workBox) {
            workBox.addEventListener('click', (workBox) => {
                make_calendar_container.classList.add('show');
                var startTimeElement = document.getElementById("start_time");
                startTimeElement.value = `${workBox.target.parentNode.getAttribute('date')}T${convertTime(workBox.target.getAttribute('time'))}`;
                var endTimeElement = document.getElementById("end_time");
                endTimeElement.value = `${workBox.target.parentNode.getAttribute('date')}T${convertTime(workBox.target.getAttribute('time'))}`;
                console.log(`${workBox.target.parentNode.getAttribute('date')}T${convertTime(workBox.target.getAttribute('time'))}`);
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
            return events.find((event)=>(event.getAttribute('date') === date))
        }

        for (let i = 0; i < currentDays.length; i++) {
            let eventInCurWeek = getEvents(currentDays[i].getAttribute('date'))
            if(eventInCurWeek) {
                eventInCurWeek.classList.add('active')
            }
        }

        events.forEach(function (event) {
            event.addEventListener('click', () => 
                window.location.href = "/meeting"
            )
            
            let curHeight
            event.addEventListener('mouseenter', (e) => {
                curHeight = e.target.clientHeight
                if(e.target.scrollHeight > e.target.clientHeight) {
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
    start: function () {
        this.config()
        this.renderWeek(currentDate)
        this.loadEvents()
        this.renderEvents()
        this.handleEvents()
    },
}

// Chuyển đổi thời gian cho đúng chuyển đề hiện thị ra place holder
var convertTime = function (time) {
    var hours = parseInt(time);
    var minutes = (time - hours) * 60;
    var midifyMinitues = minutes.toString().padStart(2, '0')
    var midifyHours = hours.toString().padStart(2, '0')
    return `${midifyHours}:${midifyMinitues}`;
};

calendar.start()