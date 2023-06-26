// them su kien khi click vao student
function clickRowStudent(e) {
    console.log(e.currentTarget);
    e.stopPropagation;
}

const tableBody = document.querySelector('.table-student table tbody')
// var formok = document.querySelector('.formok');
// tham số render mặc định
let student_id = 'student_id';
let group_id = 'group_id';
let phonenumber = 'phonenumber';
let term = 'term';
let email = 'email';
let fullname = 'fullname';
let projectname = 'projectname';
// hàm render
function renderTable(studentList) {
    tableBody.innerHTML = '';
    studentList.forEach(value => {
        let row = document.createElement('tr');
        row.innerHTML = `<td>${value[student_id]}</td><td>${value[group_id]}</td>
            <td>${value[phonenumber]}</td><td>${value[term]}</td>
            <td>${value[email]}</td><td>${value[fullname]}</td>
            <td>${value[projectname]}</td>`;
        row.addEventListener('click', clickRowStudent);
        tableBody.appendChild(row);
    })
    // let htmlStudents = studentList.map(function (value) {
    //     return `<tr><td>${value[student_id]}</td><td>${value[group_id]}</td>
    //     <td>${value[phonenumber]}</td><td>${value[term]}</td><td>${value[birthday]}</td>
    //     <td>${value[email]}</td><td>${value[fullname]}</td>
    //     <td>${value[projectname]}</td></tr>`;
    // })
    // let resultHtml = htmlStudents.join('')
    // tableBody.innerHTML = resultHtml

}

// parse file exel
var parseExcel = [];
var ExcelExport = function (event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, { type: 'binary' });

        wb.SheetNames.forEach(function (sheetName) {
            var rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
            parseExcel = rowObj;
            console.log(rowObj)
            // gọi hàm render
            // var formok = document.querySelector('.formok');
            // console.log(formok);
            renderTable(rowObj)
        })
    };
    reader.readAsBinaryString(input.files[0]);
};
var inputFile = document.querySelector('#file')
inputFile.addEventListener('change', ExcelExport, false)



// var promise = new Promise(
//     function (resolve, reject) {

//     }
// )
// promise.then().catch().finally()

// var cover = document.querySelector('.cover')
// var mockUp = document.querySelector('.click-student')

// var clickStudent = function (e) {
//     mockUp.style.display = 'block'
//     cover.style.display = 'block'
// }
// var clickCover = function (e) {
//     mockUp.style.display = 'none'
//     cover.style.display = 'none'
// }
// tableBody.addEventListener('click', clickStudent)
// cover.addEventListener('click', clickCover)

// lay danh sach student theo ky
function getTerm(term) {
    if (!Number(term))
        return;
    fetch(`/list/getterm?term=${term}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('getTerm was not OK');
    })
    .then(data => {
        // xử lý dữ liệu từ server
        renderTable(data);
    })
    .catch(err => {
        console.log(err.message);
    });
}

// mac dinh khi load trang
window.onload = () => {
    getTerm(20222);

}
// tìm kiếm theo kỳ
let searchTerm = document.querySelector('.list-student .select-term a');
let inputTerm = document.querySelector('.list-student .select-term input');
searchTerm.addEventListener('click', e => {
    e.preventDefault();
    getTerm(inputTerm.value);
});




