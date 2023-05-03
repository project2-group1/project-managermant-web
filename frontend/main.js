const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// XỬ lý add calendar
const btn_add_calendar = $('.btn-add-calendar');
const btn_close_calendar = $('.btn-close-calendar');
const make_calendar_container = $('#make-calendar-container');

console.log(btn_close_calendar);

btn_add_calendar.onclick = function(){
    make_calendar_container.classList.add('show');
}

btn_close_calendar.onclick = function(){
    make_calendar_container.classList.remove('show');
}

// kết thúc xử lý

/* # Nghĩa : START */

const btnOpenSidebar = $('.btn-sidebar')
const wrapperSidebar = $('.wrapper-sidebar')
const wrapperContent = $('.wrapper-content')


btnOpenSidebar.onclick = function() {
    if(wrapperSidebar.classList.contains('hidden')){
        wrapperSidebar.classList.remove('hidden')
        wrapperContent.classList.remove('fullwidth')
    }
    else{
        wrapperSidebar.classList.add('hidden')
        wrapperContent.classList.add('fullwidth')
    }
}

/* # Nghĩa : END */
