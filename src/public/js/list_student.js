let group_modal = document.querySelector('.group-modal');
let manipulate_group = document.querySelector('.manipulate-group');

// đóng modal
document.querySelector('.group-modal a').addEventListener('click', e => {
    e.preventDefault;
    group_modal.style.display = 'none';
})
document.querySelector('.manipulate-group i').addEventListener('click', e =>{
    manipulate_group.style.display = 'none';
})


// khi click vao group
function clickRowGroup(e) {
    e.stopPropagation;

    
    let row = e.currentTarget;
    let group = {};
    group.group_id = row.children[0].innerText;
    group.term = row.children[1].innerText;
    group.projectname = row.children[2].innerText
    group.course_id = row.children[3].innerText
    group.coursename = row.children[4].innerText

    manipulate_group.style.left = e.clientX + "px"; // set the manipulate-group position to the last stored position
    manipulate_group.style.top = e.clientY + "px";
    // editGroup(group);
    manipulateGroup(group);
}
function clickRowStudent(e) {
    console.log(e.currentTarget);
    e.stopPropagation;
}

const tableBody = document.querySelector('.table-student table tbody')
// tham số render mặc định
let student_id = 'student_id';
let group_id = 'group_id';
let phonenumber = 'phonenumber';
let term = 'term';
let email = 'email';
let fullname = 'fullname';
let projectname = 'projectname';
let course_id = 'course_id';
let course_name = 'coursename';
let birthday = 'birthday';
// hàm render
function renderTable(groupList) {
    tableBody.innerHTML = '';
    groupList.forEach(value => {
        let row = document.createElement('tr');
        // thêm hàng nhóm
        let size = value.students.length + 1;
        row.innerHTML = `<td rowspan="${size}">${value[group_id]}</td>
        <td rowspan="${size}">${value[term]}</td><td rowspan="${size}">${value[projectname]}</td>
        <td rowspan="${size}">${value[course_id]}</td><td rowspan="${size}">${value[course_name]}</td>
        `;
        row.addEventListener('click', clickRowGroup);
        tableBody.appendChild(row);
        
        // thêm hàng sinh viên
        value.students.forEach(student => {
            let row = document.createElement('tr');
            row.innerHTML = `<td>${student[student_id]}</td>
            <td>${student[fullname]}</td><td>${student[phonenumber]}</td>
            <td>${student[email]}</td><td>${student[birthday]}</td>`;
            row.addEventListener('click', clickRowStudent);
            tableBody.appendChild(row);
        })
    })
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

// sửa nhóm
function editGroup(group) {
    let form = document.querySelector('.group-modal form');
    form.querySelector('#group_id').value = group.group_id;
    form.querySelector('#old_id').value = group.group_id;
    form.querySelector('#old_id').style.display = 'block';
    form.querySelector('#term').value = group.term;
    form.querySelector('#projectname').value = group.projectname;
    form.querySelector('#course_id').value = group.course_id;
    form.querySelector('#coursename').value = group.coursename;
    group_modal.style.display = 'block';
    form.action = '/list/editgroup';

}
//  thêm nhóm
let buttonAddGroup = document.querySelector('.list-button .add-group');
buttonAddGroup.addEventListener('click', addGroup);
function addGroup(event) {
    event.stopPropagation;
    event.preventDefault;

    let form = document.querySelector('.group-modal form');
    form.querySelector('#group_id').value = '';
    form.querySelector('#term').value = '';
    form.querySelector('#projectname').value = '';
    form.querySelector('#course_id').value = '';
    form.querySelector('#coursename').value = '';
    form.querySelector('#old_id').style.display = 'none';
    group_modal.style.display = 'block';
    form.action = '/list/addgroup';
}
// thao tac voi nhom
function manipulateGroup(group) {
    document.querySelector('.manipulate-group .group-id').innerText = group.group_id;
    manipulate_group.style.display = 'block';
    manipulate_group.querySelector('.edit').onclick = e => {
        editGroup(group)
    };
    manipulate_group.querySelector('.delete').onclick = e => {
        if(window.confirm('xác nhận xóa nhóm')) {
            fetch(`/list/deletegroup?group_id=${group.group_id}`)
            .then(response => response.text())
            .then(serverResponse => {
                alert(serverResponse); // Hiển thị thông báo với chuỗi nhận được từ máy chủ
                location.reload();
            })
            .catch(error => {
                console.error('Lỗi:', error);
            });
        }
    }
}





