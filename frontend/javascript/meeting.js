const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// XỬ lý add calendar
const btn_add_calendar = $('.btn.icon-add-calendar');
const btn_close_calendar = $('.btn.btn-close-calendar');
const make_calendar_container = $('.make-calendar.container');

btn_add_calendar.onclick = function () {
    make_calendar_container.classList.add('show');
}

btn_close_calendar.onclick = function () {
    make_calendar_container.classList.remove('show');
}
// kết thúc xử lý add calenda