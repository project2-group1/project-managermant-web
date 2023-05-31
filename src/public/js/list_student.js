const tableBody = document.querySelector('.table-student table tbody')
// tham số render mặc định
var nhom = 'groupname'
var mssv = 'StudentID'
var ten = 'studentname'
var email = 'Email'
var deTai = 'Tên đề tài'
var maHocPhan = 'courseid'
var tenHocPhan = 'name'
var hocKy = 'termid'
var ngaySinh = 'birthdate'
// hàm render
function renderTable(studentList) {
    let htmlStudents = studentList.map(function (value) {
        return `<tr><td>${value[nhom]}</td><td>${value[mssv]}</td>
        <td>${value[ten]}</td><td>${value[email]}</td><td>${value[deTai]}</td>
        <td>${value[maHocPhan]}</td><td>${value[tenHocPhan]}</td>
        <td>${value[hocKy]}</td><td>${value[ngaySinh]}</td></tr>`;
    })
    var resultHtml = htmlStudents.join('')
    tableBody.innerHTML = resultHtml
}

// parse file exel
var parseExcel = [];
var ExcelExport = function (event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var fileData = reader.result;
        var wb = new XLSX();
        var wb = XLSX.read(fileData, { type: 'binary' });

        wb.SheetNames.forEach(function (sheetName) {
            var rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
            parseExcel = rowObj;
            console.log(rowObj)
            // gọi hàm render
            renderTable(rowObj)
        })
    };
    reader.readAsBinaryString(input.files[0]);
};
var inputFile = document.querySelector('#file')
inputFile.addEventListener('change', ExcelExport, false)



var promise = new Promise(
    function (resolve, reject) {

    }
)
promise.then().catch().finally()

var cover = document.querySelector('.cover')
var mockUp = document.querySelector('.click-student')

var clickStudent = function (e) {
    mockUp.style.display = 'block'
    cover.style.display = 'block'
}
var clickCover = function (e) {
    mockUp.style.display = 'none'
    cover.style.display = 'none'
}
// tableView.addEventListener('click', clickStudent)
// cover.addEventListener('click', clickCover)

