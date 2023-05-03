const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// XỬ lý add calendar
const btn_add_calendar = $('.btn.btn-add-calendar');
const btn_close_calendar = $('.btn.btn-close-calendar');
const make_calendar_container = $('.make-calendar-container');

btn_add_calendar.onclick = function () {
    make_calendar_container.classList.add('show');
}

btn_close_calendar.onclick = function () {
    make_calendar_container.classList.remove('show');
}

// kết thúc xử lý add calendar

// hiện ẩn side bar
const btn_sidebar = $('.btn.btn-sidebar');
const wrapperSidebar = $('.wrapper-sidebar')
// wrapperSidebar.style.display = "none"
btn_sidebar.onclick = function () {
    if (wrapperSidebar.style.display == "none") {
        wrapperSidebar.style.display = "block";
    } else {
        wrapperSidebar.style.display = "none";
    }
};
// click hiển thị event
const meeting = $('.btn.meeting');
console.log(meeting);
meeting.onclick = function () {
    window.location = "./meeting.html"
}