let group_modal = document.querySelector('.group-modal');
let manipulate_group = document.querySelector('.manipulate-group');
let manipulate_student = document.querySelector('.manipulate-student');
let student_modal = document.querySelector('.student-modal');


// đóng modal group
document.querySelector('.group-modal a').addEventListener('click', e => {
    e.preventDefault;
    group_modal.style.display = 'none';
})
// đóng modal student
document.querySelector('.student-modal a').addEventListener('click', e => {
    e.preventDefault;
    student_modal.style.display = 'none';
})
// đóng form student
document.querySelector('.manipulate-student i').addEventListener('click', e =>{
    manipulate_student.style.display = 'none';
})
// đóng form group
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
// click vào student
function clickRowStudent(e) {
    e.stopPropagation;

    let row = e.currentTarget;
    let student = {};
    student.student_id = row.children[0].innerText;
    student.group_id = row.children[1].innerText;
    student.fullname = row.children[2].innerText;
    student.phonenumber = row.children[3].innerText
    student.email = row.children[4].innerText
    student.birthday = row.children[5].innerText
    console.log(student);

    manipulate_student.style.left = e.clientX + "px"; // set the manipulate-student position to the last stored position
    manipulate_student.style.top = e.clientY + "px";
    // editstudent(student);
    manipulateStudent(student);
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
            <td style="display: none;">${student[group_id]}</td>
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
            handleExcel(rowObj);
        })
    };
    reader.readAsBinaryString(input.files[0]);
};

function handleExcel(obj) {
    console.log(obj);
    const groups = [];
    const students = [];
    let projectname = 'Tên đề tài';
    obj.forEach(value => {
        let group = {};
        group.group_id = value.groupid;
        group.course_id = value.courseid;
        group.projectname = value[projectname];
        group.coursename = value.name;
        group.term = value.termid;
        groups.push(group);

        let student = {};
        student.student_id = value.StudentID;
        student.group_id = value.groupid;
        student.fullname = value.studentname;
        student.email = value.Email;
        student.phonenumber = "0123456789";
        student.birthday = "0000-00-00";
        students.push(student);
    });
    console.log(groups)
    console.log(students)
    importGroups(groups);
    importStudents(students);

}


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
        if(window.confirm('xác nhận xóa nhóm: ' + group.group_id)) {
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
// thao tac voi student
function manipulateStudent(student) {
    document.querySelector('.manipulate-student .student-id').innerText = student.student_id;
    manipulate_student.style.display = 'block';
    manipulate_student.querySelector('.edit').onclick = e => {
        editStudent(student)
    };
    manipulate_student.querySelector('.delete').onclick = e => {
        if(window.confirm('xác nhận xóa student: ' + student.student_id +
        ' , group id: ' + student.group_id)) {
            fetch(`/list/deletestudent?student_id=${student.student_id}&group_id=${student.group_id}`)
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

// sửa student
function editStudent(student) {
    let form = document.querySelector('.student-modal form');
    form.querySelector('#student_id').value = student.student_id;
    form.querySelector('#old_id').value = student.student_id;
    form.querySelector('#old_id').style.display = 'block';
    form.querySelector('#old_group_id').value = student.group_id;
    form.querySelector('#old_group_id').style.display = 'block';
    form.querySelector('#group_id').value = student.group_id;
    form.querySelector('#fullname').value = student.fullname;
    form.querySelector('#email').value = student.email;
    form.querySelector('#phonenumber').value = student.phonenumber;
    form.querySelector('#birthday').value = student.birthday;
    student_modal.style.display = 'block';
    form.action = '/list/editstudent';

}
//  thêm student
let buttonAddStudent = document.querySelector('.list-button .add-student');
buttonAddStudent.addEventListener('click', addStudent);
function addStudent(event) {
    event.stopPropagation;
    event.preventDefault;
    let form = document.querySelector('.student-modal form');
    form.querySelector('#student_id').value = "";
    form.querySelector('#old_id').value = "";
    form.querySelector('#old_id').style.display = 'none';
    form.querySelector('#old_group_id').style.display = 'none';
    form.querySelector('#group_id').value = "";
    form.querySelector('#fullname').value = "";
    form.querySelector('#email').value = "";
    form.querySelector('#phonenumber').value = "";
    // form.querySelector('#birthday').value = "";
    student_modal.style.display = 'block';
    form.action = '/list/insertstudent';
}

function importGroups(groups) {
    // Gửi dữ liệu lên server
    fetch('/list/importgroups', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' // Định dạng dữ liệu là JSON
        },
        body: JSON.stringify(groups) // Chuyển đối tượng dữ liệu thành chuỗi JSON
    })
    .then(response => {
        if (response.ok) {
        // Xử lý kết quả trả về nếu gửi thành công
        console.log('Dữ liệu đã được gửi thành công!');
        } else {
        // Xử lý lỗi nếu gửi không thành công
        console.log('Đã xảy ra lỗi khi gửi dữ liệu!');
        }
    })
    .catch(error => {
        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình gửi
        console.log('Đã xảy ra lỗi:', error);
    });
}

function importStudents(students) {
    // Gửi dữ liệu lên server
    fetch('/list/importstudents', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' // Định dạng dữ liệu là JSON
        },
        body: JSON.stringify(students) // Chuyển đối tượng dữ liệu thành chuỗi JSON
    })
    .then(response => {
        if (response.ok) {
        // Xử lý kết quả trả về nếu gửi thành công
        console.log('Dữ liệu đã được gửi thành công!');
        } else {
        // Xử lý lỗi nếu gửi không thành công
        console.log('Đã xảy ra lỗi khi gửi dữ liệu!');
        }
    })
    .catch(error => {
        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình gửi
        console.log('Đã xảy ra lỗi:', error);
    });
    setTimeout(() => {
        location.reload();
    }, 5000)
}




