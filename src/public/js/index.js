const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// XỬ lý add calendar
const btn_add_calendar = $('.btn.btn-add-calendar');
const make_calendar_container = $('.make-calendar.container');

/* START - NGỌC XỬ LÝ MODAL */
var text = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="title">Thêm cuộc họp mới</h3>
                <button onclick="closeCalendar()"class="btn btn-close-calendar"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row">
                        <h4>Tiêu đề</h4>
                        <div class="input-group input-group-icon">
                            <div class="input-icon"><i class="fa-solid fa-server"></i></div>
                            <input class="input-text" type="text" placeholder="Tiêu đề"/>
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
                                <select id="course" name="course" required>
                                    <option value="" disabled selected>Học phần</option>
                                </select>
                            </div>
                            <div class="col-third">
                                <select id="group" name="group" required>
                                    <option value="" disabled selected>Nhóm</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <h4>Thời gian</h4>
                        <div class="row">
                            <p class="p-time">Bắt đầu</p>
                            <input class="input-time start_time" type="text" step="1800" min="07:00" max="18:00" id="start_time" name="start_time">
                        </div>
                        <div class="row">
                            <p class="p-time">Kết thúc</p>
                            <input class="input-time end_time" type="text" step="1800" min="07:00" max="18:00" id="end_time" name="end_time">
                        </div>
                        <div class="row">
                            <p class="p-time">Báo cáo</p>
                            <input class="input-time report_time" type="text" step="1800" min="07:00" max="18:00" id="dl_report_time" name="dl_report_time">
                        </div>
                    </div>
                    
                    
                    <div class="row">
                        <h4>Ghi chú</h4>
                        <textarea class="note" name="note" placeholder="Ghi chú"></textarea>
                    </div>

                    <div class="row">
                        <input type="submit"  class="submit" value="Thêm cuộc họp mới">
                    </div>

                </form>
            </div>
        </div>
        `
make_calendar_container.innerHTML = text;

if (btn_add_calendar) {
    btn_add_calendar.onclick = function () {
        make_calendar_container.classList.add('show');
    }
}

var closeCalendar = function () {
    const btn_close_calendar = $('.btn.btn-close-calendar');
    if (btn_close_calendar) {
        make_calendar_container.classList.remove('show');
    }
}

/* END - NGỌC */

const btnAvatarNav = $('.btn-avatar')

btnAvatarNav.onclick = function () {
    const avatarNav = this.children
    for (let i = 0; i < avatarNav.length; i++) {
        if (avatarNav[i].classList.contains('avatar-nav')) {
            avatarNav[i].classList.toggle('show')
        }
    }
}

/* # Ngọc: START */

/* END - NGỌC */


/*--------------------Nghĩa : START---------------------*/
// selector
const btnAvatarNav = $('.btn-avatar')
const btnSidebar = $('.btn-sidebar')
const wrapperSidebar = $('.wrapper-sidebar')
const wrapperContent = $('.wrapper-content')

// Button on/off avatar nav
btnAvatarNav.onclick = function () {
    const avatarNav = this.children
    for (let i = 0; i < avatarNav.length; i++) {
        if (avatarNav[i].classList.contains('avatar-nav')) {
            avatarNav[i].classList.toggle('show')
        }
    }
}

// Button on/off sidebar
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
}

/*--------------------Nghĩa : END---------------------*/



// chuyển hướng ds sinh viên
const studentList = $('body > div > div.wrapper-sidebar > div > div.sidebar-item.sidebar-studentlist > button');
studentList.onclick = function () {
    window.location.href = "./dssinhvien.html"
}

/* # Ngọc: START */
const logo_page = $('.logo-page')
logo_page.onclick = function () {
    window.location.href = "./index.html"
}

/* # Ngọc: START */