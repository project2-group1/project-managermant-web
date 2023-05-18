const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// XỬ lý add calendar
const btn_add_calendar = $('.btn.btn-add-calendar');
const btn_close_calendar = $('.btn.btn-close-calendar');
const make_calendar_container = $('.make-calendar.container');

if (btn_add_calendar) {
    btn_add_calendar.onclick = function () {
        make_calendar_container.classList.add('show');
    }
}

if (btn_close_calendar) {
    btn_close_calendar.onclick = function () {
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
