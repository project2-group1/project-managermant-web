
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// XỬ lý add calendar
const btn_add_calendar = $('.btn.btn-add-calendar');
const make_calendar_container = $('.make-calendar.container');


const modalAddCalendar = {
    inputStartTime: null,
    inputEndTime: null,
    inputReportTime: null,
    config: function () {
        var text = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="title">Thêm cuộc họp mới</h3>
                <button class="btn btn-close-calendar"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body">
                <form method="POST" action="/create">
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
                                    <option value="" disabled selected>Kì</option>
                                    <option value="20221">20221</option>
                                    <option value="20222">20222</option>
                                    <option value="20231">20231</option>
                                </select>
                            </div>
                            <div class="col-third">
                                <select id="course_id" name="course_id" required>
                                    <option value="" disabled selected>Học phần</option>
                                    <option value="IT3931">IT3931 - Project II</option>
                                </select>
                            </div>
                            <div class="col-third">
                                <select id="group_id" name="group_id" required>
                                    <option value="" disabled selected>Nhóm</option>
                                    <option value="20222001"> Nhóm 1 </option>
                                    <option value="20222002"> Nhóm 2 </option>
                                    <option value="20222003"> Nhóm 3 </option>
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

        const btnAvatarNav = $('.btn-avatar')
        btnAvatarNav.onclick = function () {
            const avatarNav = this.children
            for (let i = 0; i < avatarNav.length; i++) {
                if (avatarNav[i].classList.contains('avatar-nav')) {
                    avatarNav[i].classList.toggle('show')
                }
            }
        }

    },
    start: function () {
        this.config()
        this.handle()
    }
}

const modalAddFreeTime = {
    inputStartTime: null,
    inputEndTime: null,
    form: null,
    config: function () {
        var text = `
        <form method="POST" action="" class="addfreetime">
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
                <input type="submit"  class="submit1" value="Thêm cuộc họp mới">
            </div>
        </form>        
     `
        make_calendar_container.innerHTML = text;

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
        const form = $('.addfreetime');
    },
    start: function () {
        this.config();
        this.handle();
    }
}

modalAddFreeTime.start();
modalAddCalendar.start()

export { modalAddCalendar, modalAddFreeTime }