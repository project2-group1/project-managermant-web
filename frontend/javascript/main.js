const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// XỬ lý add calendar
const btn_add_calendar = $('.btn.btn-add-calendar');
const make_calendar_container = $('.make-calendar.container');


if (btn_add_calendar) {
    btn_add_calendar.onclick = function () {
        var text = `
            <div class="modal">
                <div class="modal-header">
                    <h3 class="title">Thêm cuộc họp mới</h3>
                    <button onclick="closeCalendar()"class="btn btn-close-calendar"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-body">
                    <form>
                        <label for="title">Tiêu đề:</label><br>
                        <input type="text" id="title" name="title" placeholder="Thêm tiêu đề"><br>

                        <label for="start_time">Thời gian bắt đầu:</label><br>
                        <input type="datetime-local" id="start_time" name="start_time"><br>

                        <label for="group">Nhóm tham gia:</label><br>
                        <select id="group" name="group">
                            <option value="group1">Nhóm 1</option>
                            <option value="group2">Nhóm 2</option>
                            <option value="group3">Nhóm 3</option>
                        </select><br>
                        <label for="deadline">Deadline báo báo:</label><br>
                        <input type="datetime-local" id="end_time" name="end_time"><br>
                        <label for="subject">Subject</label>
                        <textarea id="subject" name="subject" placeholder="Ghi chú" style="height:200px"></textarea>
                        <input type="submit" value="Thêm cuộc họp mới">
                        
                    </form>
                </div>
            </div>
         `
        make_calendar_container.innerHTML = text;
        make_calendar_container.classList.add('show');
    }
}

var closeCalendar = function () {
    const btn_close_calendar = $('.btn.btn-close-calendar');
    if (btn_close_calendar) {
        make_calendar_container.classList.remove('show');
    }
}

// kết thúc xử lý add calendar

/* 
// click hiển thị event
const meeting = $('.btn.meeting');
meeting.onclick = function () {
    window.location.href = "./meeting.html"
}
 */


/* # Nghĩa : START */

// Button on/off avatar nav
const btnAvatarNav = $('.icon-avatar')

btnAvatarNav.onclick = function () {
    const avatarNav = this.children
    for (let i = 0; i < avatarNav.length; i++) {
        if (avatarNav[i].classList.contains('avatar-nav')) {
            avatarNav[i].classList.toggle('show')
        }
    }
}

// Button on/off sidebar
const btnSidebar = $('.btn-sidebar')
const wrapperSidebar = $('.wrapper-sidebar')
const wrapperContent = $('.wrapper-content')

btnSidebar.onclick = function () {
    console.log(btnSidebar) // check
    if (wrapperSidebar.classList.contains('hidden')) {
        wrapperSidebar.classList.remove('hidden')
        wrapperContent.classList.remove('fullwidth')
    }
    else {
        wrapperSidebar.classList.add('hidden')
        wrapperContent.classList.add('fullwidth')
    }
}

// Button move to the meeting
const btnMoveToMeeting = $$('.btn-event-meeting')

btnMoveToMeeting.forEach((element) => {
    element.onclick = function () {
        window.location.href = "./meeting.html"
    }
})

// Button create event
/* # Nghĩa : END */


// chuyển hướng ds sinh viên
const studentList = $('body > div > div.wrapper-sidebar > div > div.sidebar-item.sidebar-studentlist > button');
studentList.onclick = function () {
    window.location.href = "./dssinhvien.html"
}