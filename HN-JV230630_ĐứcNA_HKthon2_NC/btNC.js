// Viết chương trình Quản Lý Học Viên gồm các chức năng sau:
// 1. Danh sách học viên được lưu trong một mảng với tên students[10 điểm]
// 2. Nhập đầy đủ thông tin các trường trong form “Thông tin học viên” khi nhấn
// lưu lại sẽ thêm thông tin học viên vào students và được hiển thị thông tin tất cả học viên trên
// “Danh sách học viên”[25 điểm]
// 2. Khi nhấn delete sẽ xoá học viên trong students và hiển thị thông tin các học viên còn lại
// trên “Danh sách học viên”[10 điểm]
// 3. Khi nhấn edit, dữ liệu học viên cập nhật được hiển thị trên form “Thông tin học viên”, nhấn
// lưu lại, thực hiện cập nhật thông tin học viên trong students và hiển thị lại thông tin các học
// viên trên “Danh sách học viên”[15 điểm]
// 4. Khi nhấn vào nút sắp xếp(anpha b), sắp xếp học viên và hiển thị danh sách học viên đã
// được sắp xếp theo anpha b trên bảng “Danh sách học viên”[15 điểm]
// 5. Ở ô tìm kiếm có thế tìm kiếm học viên theo tên học viên và hiển thị kết quả ở bảng “Danh
// sách học viên”[15 điểm]
// 6. Thực hiện validate dữ liệu đầu vào trong các chức năng: [10 điểm]
// ● Họ và tên: không được để trống
// ● Email: phải nhập đúng định dạng email
// ● Số điện thoại: phải nhập đúng định dạng số điện thoại di động ở Việt Nam
// ● Quê quán: không được để trống
// ● Giới tính: default là Nam


// 1. Danh sách học viên được lưu trong một mảng với tên students
let students = [];
// if (localStorage.getItem("students")) {
//     students = JSON.parse(localStorage.getItem("students"));
// } else {
//     localStorage.setItem("students", JSON.stringify(students));
// }
// function saveData() {
//     localStorage.setItem("students", JSON.stringify(students));
// }

let indexUpdate = null;
function showTable(data=students) {
    let str = "";
    for (i = 0; i < data.length; i++) {
        let element = data[i];
        str += ` <tr>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>${element.phone}</td>
                <td>${element.address}</td>
                <td>${element.gender}</td>
                <td><button onclick="updateStudent(${i})">update</button></td>
                <td><button onclick="deleteStudent(${i})">delete</button></td>
                <td></td>
            </tr>`
    }
    document.getElementById("tbody").innerHTML = str;
}
showTable();

function saveStudent() {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let gender = document.querySelector('input[name="gender"]:checked').value;

    if (indexUpdate != null) {
        students[indexUpdate] = {
            name,
            email,
            phone,
            address,
            gender
        }
        showTable();
        indexUpdate = null;
        return;
    }

    let newStudent = {
        name,
        email,
        phone,
        address,
        gender
    }
    students.push(newStudent);
    showTable();
}

function deleteStudent(index) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        if (index !== -1) {
            students.splice(index, 1);
            showTable();
            saveData();
        }
    }
}

function updateStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("phone").value = student.phone;
    document.getElementById("address").value = student.address;
    document.querySelector(`input[name="gender"][value="${student.gender}"]`).checked = true;
    indexUpdate = index;
}

function sortStudent() {
    students.sort((a, b) => a.name.localeCompare(b.name));
    showTable();
}

function searchStudent() {
    let textSearch = document.getElementById("search").value;
    let findStudent = students.filter(student => student.name.toLowerCase().includes(textSearch.trim().toLowerCase()))
    showTable(findStudent);
}





