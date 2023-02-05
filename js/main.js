let staffList = [];

function createStaff() {
  let account = getElement("#tknv").value;
  let name = getElement("#name").value;
  let email = getElement("#email").value;
  let password = getElement("#password").value;
  let workingDay = getElement("#datepicker").value;
  let basicSalary = +getElement("#luongCB").value;
  let position = getElement("#chucvu").value;
  let workTime = +getElement("#gioLam").value;

  let isValid = validateForm();

  if (!isValid) {
    return;
  }

  const staff = new Staff(
    account,
    name,
    email,
    password,
    workingDay,
    basicSalary,
    position,
    workTime
  );

  staffList.push(staff);

  renderTable(staffList);
  resetForm();

  getElement("#btnThemNV").setAttribute("data-dismiss", "modal");
}

function searchStudent() {
  let search = getElement("#searchName").value;

  let newStaff = staffList.filter((staff) => {
    let name = staff.rankings().toLowerCase();
    search = search.toLowerCase();

    return name.indexOf(search) !== -1;
  });

  renderTable(newStaff);
}

function updateStall() {
  let account = getElement("#tknv").value;
  let name = getElement("#name").value;
  let email = getElement("#email").value;
  let password = getElement("#password").value;
  let workingDay = getElement("#datepicker").value;
  let basicSalary = +getElement("#luongCB").value;
  let position = getElement("#chucvu").value;
  let workTime = +getElement("#gioLam").value;

  let isValid = validateForm();

  if (!isValid) {
    return;
  }

  const staff = new Staff(
    account,
    name,
    email,
    password,
    workingDay,
    basicSalary,
    position,
    workTime
  );

  let index = staffList.findIndex((staff) => staff.account === account);

  staffList[index] = staff;

  renderTable(staffList);
  resetForm();
}

function editStall(account) {
  let selectedStall = staffList.find((staff) => {
    return staff.account === account;
  });

  getElement("#tknv").value = selectedStall.account;
  getElement("#name").value = selectedStall.name;
  getElement("#email").value = selectedStall.email;
  getElement("#password").value = selectedStall.password;
  getElement("#datepicker").value = selectedStall.workingDay;
  getElement("#luongCB").value = selectedStall.basicSalary;
  getElement("#chucvu").value = selectedStall.position;
  getElement("#gioLam").value = selectedStall.workTime;

  getElement("#btnCapNhat").disabled = false;
  getElement("#btnThemNV").disabled = true;
  getElement("#tknv").disabled = true;
}

function deleteStall(account) {
  staffList = staffList.filter((staff) => {
    return staff.account !== account;
  });

  renderTable(staffList);
}

function renderTable(staffList) {
  let html = staffList.reduce((output, staff) => {
    return (
      output +
      `
    <tr>
       <td>${staff.account}</td>
       <td>${staff.name}</td>
       <td>${staff.email}</td>
       <td>${staff.workingDay}</td>
       <td>${staff.position}</td>
       <td>${staff.calcSalary()}</td>
       <td>${staff.rankings()}</td>
       <td>
       <button class="btn btn-primary" data-toggle="modal"
       data-target="#myModal" onClick="editStall('${
         staff.account
       }')">Chỉnh sửa</button>
       <button class="btn btn-danger" onClick="deleteStall('${
         staff.account
       }')">Xóa</button>
      </td>
     </tr>
    `
    );
  }, "");

  getElement("#tableDanhSach").innerHTML = html;
  getElement("#tbTKNV").innerHTML = "Tài khoản không được để trống";
}

function resetForm() {
  getElement("#tknv").value = "";
  getElement("#name").value = "";
  getElement("#email").value = "";
  getElement("#password").value = "";
  getElement("#datepicker").value = "";
  getElement("#luongCB").value = "";
  getElement("#chucvu").value = "";
  getElement("#gioLam").value = "";

  getElement("#btnThemNV").disabled = false;
  getElement("#tknv").disabled = false;
}

function getElement(selector) {
  return document.querySelector(selector);
}

function validateForm() {
  let isValid = true;

  let account = getElement("#tknv").value;
  let regexAccount = /^[0-9]{4,6}$/;
  if (!account.trim()) {
    isValid = false;
    getElement("#tbTKNV").style.display = "block";
    getElement("#tbTKNV").innerHTML = "Tài khoản không được để trống";
  } else if (!regexAccount.test(account)) {
    isValid = false;
    getElement("#tbTKNV").style.display = "block";
    getElement("#tbTKNV").innerHTML =
      "Tài khoản không hợp lệ, Vui lòng nhâp tối đa 4-6 ký số";
  } else {
    getElement("#tbTKNV").style.display = "none";
  }

  let name = getElement("#name").value;
  let regexName = /^[^\d+]*[\d+]{0}[^\d+]*$/;
  if (!name.trim()) {
    isValid = false;
    getElement("#tbTen").style.display = "block";
    getElement("#tbTen").innerHTML = "Họ và tên không được để trống";
  } else if (!regexName.test(name)) {
    isValid = false;
    getElement("#tbTen").style.display = "block";
    getElement("#tbTen").innerHTML = "Họ và tên không hợp lệ";
  } else {
    getElement("#tbTen").style.display = "none";
  }

  let email = getElement("#email").value;
  let regexEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
  if (!email.trim()) {
    isValid = false;
    getElement("#tbEmail").style.display = "block";
    getElement("#tbEmail").innerHTML = "Email không được để trống";
  } else if (!regexEmail.test(email)) {
    isValid = false;
    getElement("#tbEmail").style.display = "block";
    getElement("#tbEmail").innerHTML = "Email không hợp lệ";
  } else {
    getElement("#tbEmail").style.display = "none";
  }

  let password = getElement("#password").value;
  let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,10}$/;
  if (!password.trim()) {
    isValid = false;
    getElement("#tbMatKhau").style.display = "block";
    getElement("#tbMatKhau").innerHTML = "Mật khẩu không được để trống";
  } else if (!regexPassword.test(password)) {
    isValid = false;
    getElement("#tbMatKhau").style.display = "block";
    getElement("#tbMatKhau").innerHTML =
      "Mật khẩu không hợp lệ, Vui lòng nhập mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
  } else {
    getElement("#tbMatKhau").style.display = "none";
  }

  let workingDay = getElement("#datepicker").value;
  let regexWorkingDay =
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  if (!workingDay.trim()) {
    isValid = false;
    getElement("#tbNgay").style.display = "block";
    getElement("#tbNgay").innerHTML = "Ngày làm không được để trống";
  } else if (!regexWorkingDay.test(workingDay)) {
    isValid = false;
    getElement("#tbNgay").style.display = "block";
    getElement("#tbNgay").innerHTML =
      "Ngày làm không hợp lệ, Vui lòng nhập theo thứ tự ngày / tháng / năm";
  } else {
    getElement("#tbNgay").style.display = "none";
  }

  let basicSalary = getElement("#luongCB").value;
  if (!basicSalary.trim()) {
    isValid = false;
    getElement("#tbLuongCB").style.display = "block";
    getElement("#tbLuongCB").innerHTML = "Lương cơ bản không được để trống";
  } else if (basicSalary < 1000000 || basicSalary > 20000000) {
    isValid = false;
    getElement("#tbLuongCB").style.display = "block";
    getElement("#tbLuongCB").innerHTML =
      "Lương cơ bản không hợp lệ, Vui lòng nhập từ 1 000 000 - 20 000 000";
  } else if (1000000 <= basicSalary <= 20000000) {
    getElement("#tbLuongCB").style.display = "none";
  }

  let position = getElement("#chucvu").value;
  console.log(position);
  if (position === "") {
    isValid = false;
    getElement("#tbChucVu").style.display = "block";
    getElement("#tbChucVu").innerHTML = "Vui lòng chọn chức vụ";
  } else {
    getElement("#tbChucVu").style.display = "none";
  }

  let workTime = getElement("#gioLam").value;
  if (!workTime.trim()) {
    isValid = false;
    getElement("#tbGiolam").style.display = "block";
    getElement("#tbGiolam").innerHTML =
      "Giờ làm trong tháng không được để trống";
  } else if (workTime < 80 || workTime > 200) {
    isValid = false;
    getElement("#tbGiolam").style.display = "block";
    getElement("#tbGiolam").innerHTML =
      "Giờ làm trong tháng không hợp lệ, Vui lòng nhập từ 80 - 200 giờ";
  } else if (80 <= workTime <= 200) {
    getElement("#tbGiolam").style.display = "none";
  }

  return isValid;
}
