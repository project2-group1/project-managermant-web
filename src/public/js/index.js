const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const wrapperSidebar = document.querySelector('.wrapper-sidebar')
const wrapperContent = document.querySelector('.wrapper-content')
const btnSidebar = document.querySelector('.btn-sidebar');

const monthMapping = {
    jan: '1',
    feb: '2',
    mar: '3',
    apr: '4',
    may: '5',
    jun: '6',
    jul: '7',
    aug: '8',
    sep: '9',
    oct: '10',
    nov: '11',
    dec: '12',
}

// Button on/off sidebar
btnSidebar.onclick = function () {
    if (wrapperSidebar.classList.contains('hidden')) {
        wrapperSidebar.classList.remove('hidden')
        wrapperContent.classList.remove('fullwidth')
    }
    else {
        wrapperSidebar.classList.add('hidden')
        wrapperContent.classList.add('fullwidth')
    }
}

// format Date from UTC to Local
function formatDateFromUTCToLocal(dataTime) {
    const time = new Date(dataTime)
    const timezoneOffset = time.getTimezoneOffset()
    return new Date(time.getTime() - timezoneOffset * 60)
}


// Format date from Date object to dd/mm/yyyy_hh:mm
function formatDate(dateTime) {
    let year = dateTime.substring(11, 16)
    let month = dateTime.substring(4, 7).toLowerCase()
    month = monthMapping[month]
    let date = dateTime.substring(8, 10)
    let hourAndMinutes = dateTime.substring(16, 21)

    return date + '/' + month + '/' + year + ' ' + hourAndMinutes
}



// chuyển hướng ds sinh viên
/*const studentList = $('body > div > div.wrapper-sidebar > div > div.sidebar-item.sidebar-studentlist > button');
studentList.onclick = function () {
    window.location.href = "./dssinhvien.html"
}
*/

/* # Ngọc: START */
const logo_page = document.querySelector('.logo-page')
logo_page.onclick = function () {
    window.location.href = "/"
}