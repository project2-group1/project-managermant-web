
// variable
let currentDate = new Date()

// css selector
var events = Array.from('.event')
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
    ],
    config: function () {


    },
    handleEvents: function () {
        const _this = this // trỏ vào calendar

        

        // Xử lý sự kiện thay đổi trong lịch tháng
        datePicker.set('onChange', function (selectedDates, dateStr, instance) {
            currentDate = selectedDates[0]
            _this.renderWeek(currentDate)
            // _this.renderEvents()

        });

        // Xử lý sự kiện nút tuần trước
        btnPrevWeek.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 7)
            _this.renderWeek(currentDate)
            // _this.renderEvents()
            datePicker.setDate(currentDate)
        })
        // btnPrevWeek.onclick = function () {
        //     currentDate.setDate(currentDate.getDate() - 7)
        //     _this.renderWeek(currentDate)
        //     datePicker.setDate(currentDate)
        // }

        // Xử lý sự kiện nút tuần tiếp theo

        btnNextWeek.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 7)
            _this.renderWeek(currentDate)
            // _this.renderEvents()
            datePicker.setDate(currentDate)
        })


        // Xử lý sự kiện nút trở về hôm nay
        btnToday.addEventListener('click', () => {
            let today = new Date()
            _this.renderWeek(today)
            // _this.renderEvents()
            datePicker.setDate(today)
            currentDate = today
        })

        // Xử lý bật tạo lịch khi bấm vào work box
        workBoxes.forEach(function (workBox) {
            workBox.addEventListener('click', (workBox) => {
                make_calendar_container.classList.add('show');
                var startTimeElement = document.getElementById("start_time");
                startTimeElement.value = `${this.parentNode.getAttribute('date')}T${convertTime(this.getAttribute('time'))}`;
                var endTimeElement = document.getElementById("end_time");
                endTimeElement.value = `${this.parentNode.getAttribute('date')}T${convertTime(this.getAttribute('time'))}`;
                console.log(`${this.parentNode.getAttribute('date')}T${convertTime(this.getAttribute('time'))}`);
            })
                // console.log(`ngày: ${workBox.target.parentNode.getAttribute('date')}` + ` giờ: ${workBox.target.getAttribute('time')}`);
            
        })



        events.forEach(function (event) {
            event.addEventListener('click', () => {
                window.location.href = "./meeting.html"
            })
        })

        // Lấy ra width của work-box đầu tiên gán vào cho event box
        function handleResizeWorkBox() {
            let workBoxWidth = workBoxes[0].offsetWidth;
            events.forEach((e) => {
                e.style.width = `${workBoxWidth * 0.9}` + "px";
            });
        }
        
        window.addEventListener("resize", handleResizeWorkBox);
        window.addEventListener("DOMContentLoaded", handleResizeWorkBox);
        
        // @Overide btnSidebar
        btnSidebar.onclick = function () {
            // console.log(btnSidebar) // check
            if (wrapperSidebar.classList.contains('hidden')) {
                wrapperSidebar.classList.remove('hidden')
                wrapperContent.classList.remove('fullwidth')
            }
            else {
                wrapperSidebar.classList.add('hidden')
                wrapperContent.classList.add('fullwidth')
            }
            handleResizeWorkBox()
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
        console.log(currentDates);

        worksColumn.forEach((e) => {
            e.classList.remove('active')
            if(e.getAttribute('date').slice(-2) == date.getDate()) {
                e.classList.add('active')
            }
        })

    },
    renderEvents: function () {

        // Lấy ra thẻ work-box thông qua date và startTime
        function getWorkBoxDate(date, startTime) {
            let curWork = worksColumn.find((workCol) => (workCol.getAttribute('date') === date))
            if(curWork) {
                let workBox = Array.from(curWork.children).find((workBox) => ((Number)(workBox.getAttribute('time')) === (startTime - 0.5)))
                return workBox
            }
        }   

        function setEventDuration(event) {
            let duration = ((Number)(event.getAttribute('endTime'))
                                - (Number)(event.getAttribute('startTime'))) / 0.5
            return duration*40.8 - 1
        }

        // render ra mảng các thẻ event
        const eventHtmls = this.eventsData.map((event, index) => {
            let start = event.startTime < 13 ? (event.startTime+'am') : (event.startTime+'pm')
            let end = event.endTime < 13 ? (event.endTime+'am') : (event.endTime+'pm')

            return `
                <button class="event" date="${event.date}" startTime="${event.startTime}" endTime="${event.endTime}">
                    <div class="content">
                        <p class="title">${event.title}</p>
                        <p class="info">${event.info}</p>
                        <p class="time">${start.replace('.5',':30')}
                                    -${end.replace('.5',':30')}</p>
                    </div>
                </button>
            `
        })

        // Lưu vào container
        const container = document.createElement('div')
        container.innerHTML = eventHtmls.join('')

        const eventContainer = Array.from(container.querySelectorAll('.event'))

        for (let i = 0; i < eventContainer.length; i++) {
            let workBox = getWorkBoxDate(eventContainer[i].getAttribute('date'),eventContainer[i].getAttribute('startTime'))
            if(workBox) {
                workBox.insertAdjacentElement('afterend',eventContainer[i])
                let eventDuration = setEventDuration(eventContainer[i])
                eventContainer[i].style.height = eventDuration + 'px'
                
            }
        }

        events = Array.from($$('.event'))
        console.log(events);



    },
    start: function () {
        this.config()
        this.renderWeek(currentDate)
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