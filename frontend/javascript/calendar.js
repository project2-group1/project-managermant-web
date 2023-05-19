
// variable
let currentDate = new Date()

// css selector
const btnPrevWeek = $('.btn-prev-week')
const btnNextWeek = $('.btn-next-week')
const btnToday = $('.btn-today')
const workBoxes = $$('.work-box')
const events = Array.from($$('.event'))
const btnEvents = Array.from($$('.btn-event'))
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

const app = {
    config: function () {


    },
    handleEvents: function () {
        const _this = this // trỏ vào app

        // Xử lý sự kiện thay đổi trong lịch tháng
        datePicker.set('onChange', function (selectedDates, dateStr, instance) {
            currentDate = selectedDates[0]
            _this.renderWeek(currentDate)
        });

        // Xử lý sự kiện nút tuần trước
        btnPrevWeek.onclick = function () {
            currentDate.setDate(currentDate.getDate() - 7)
            _this.renderWeek(currentDate)
            datePicker.setDate(currentDate)
        }

        // Xử lý sự kiện nút tuần tiếp theo
        btnNextWeek.onclick = function () {
            currentDate.setDate(currentDate.getDate() + 7)
            _this.renderWeek(currentDate)
            datePicker.setDate(currentDate)
        }

        // Xử lý sự kiện nút trở về hôm nay
        btnToday.onclick = function () {
            let today = new Date()
            _this.renderWeek(today)
            datePicker.setDate(today)
            currentDate = today
        }

        // Xử lý bật tạo lịch khi bấm vào work box
        workBoxes.forEach(function (workBox) {
            workBox.onclick = function () {
                make_calendar_container.classList.add('show');
                console.log(`ngày: ${this.parentNode.getAttribute('date')}` + ` giờ: ${this.getAttribute('time')}`);
            }
        })

        btnEvents.forEach(function (btnEvent) {
            btnEvent.onclick = function () {
                window.location.href = "./meeting.html"
            }
        })

        // Lấy ra width của work-box đầu tiên gán vào cho event box
        function handleResize() {
            let workBoxWidth = workBoxes[0].offsetWidth;
            events.forEach((e) => {
                e.style.width = `${workBoxWidth * 0.9}` + "px";
            });
        }
        window.addEventListener("resize", handleResize);
        window.addEventListener("DOMContentLoaded", handleResize);

    },
    // renderWeek tuần làm việc và gán các value vào để xử lý
    renderWeek: function (date) {
        let firstDayOfWeek = new Date(date);
        firstDayOfWeek.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1))

        let week = Array.from($$('.text-date'))
        let currentDates = [] // mảng lưu tuần hiện tại

        let temp = new Date(firstDayOfWeek)
        for (let i = 0; i < 7; i++) {
            let cur = new Date(temp)
            currentDates.push(cur)
            temp.setDate(temp.getDate() + 1)
        }

        // console.log(currentDates);


        // renderWeek ra ngày trong tuần trên row-date
        for (let i = 0; i < week.length; i++) {
            week[i].innerText = currentDates[i].getDate()
        }

        // render Day để active css
        week.forEach((e) => {
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
    },
    start: function () {
        this.config()
        this.handleEvents()
        this.renderWeek(currentDate)
    },
}

app.start()