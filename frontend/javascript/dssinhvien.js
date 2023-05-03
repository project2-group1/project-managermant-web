const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// Các thuộc tính
const renderListStudent = $('.ds-sinhvien');
const sua = $('#sua');
const luu = $('#luu');
const themSinhVien = $('#themsinhvien');

const dsLichGap = $('body > div > div.wrapper-sidebar > div > div.sidebar-item.sidebar-stored > button');

sua.onclick = function () {
    renderListStudent.setAttribute('contenteditable', 'true');
    // console.log(e);
}
luu.onclick = function () {
    renderListStudent.setAttribute('contenteditable', 'false');
}
themSinhVien.onclick = function () {
    renderListStudent.setAttribute('contenteditable', 'true');

    let newRow = document.createElement('tr');
    newRow.innerHTML = '<td></td><td>add</td><td></td><td></td>';

    renderListStudent.appendChild(newRow);

}
dsLichGap.onclick = function () {
    window.location.href = './main.html';
}