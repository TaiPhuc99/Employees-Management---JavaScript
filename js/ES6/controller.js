import { NhanVien, checkPositionValue, checkType, xepLoaiNV } from "./model.js";
import {
  message,
  checkEmpty,
  checkLength,
  checkDuplicate,
  checkWord,
  checkNumber,
  checkEmail,
  checkPassword,
  checkPosition,
  checkRangeNumber,
  checkValidDate,
} from "./validation.js";
import { danhSachNhanVien, deleteNV, editNV } from "./main.js";

// Open Modal
export const callModal = (title, type) => {
  document.getElementById("header-title").innerText = title;

  switch (type) {
    case 1:
      document.getElementById("btnCapNhat").style.display = "none";
      document.getElementById("btnThemNV").style.display = "block";
      document.getElementById("btnThemNV").style.width = "50%";
      document.getElementById("btnDong").style.width = "50%";
      break;
    case 2:
      document.getElementById("btnCapNhat").style.display = "block";
      document.getElementById("btnThemNV").style.display = "none";
      document.getElementById("btnCapNhat").style.width = "50%";
      document.getElementById("btnDong").style.width = "50%";
      break;
  }
};

// Get Info from HTML
export const getInfo = () => {
  let account = document.getElementById("tknv").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let onBoardDay = document.getElementById("datepicker").value;
  let basic = document.getElementById("luongCB").value;
  let position = document.getElementById("chucvu").selectedIndex;
  let workTime = document.getElementById("gioLam").value;

  // Return all above values == object with keys = values
  return {
    account,
    name,
    email,
    password,
    onBoardDay,
    basic,
    position,
    workTime,
  };
};

// Render List NV (Table)
export const renderListNV = (array) => {
  let contentHTML = "";
  // Change selectedIndex <==> Value
  array.forEach((item) => {
    const transformPosition = () => {
      const position = item.chucVu;
      switch (position) {
        case 1:
          return "Sếp";
        case 2:
          return "Trưởng Phòng";
        case 3:
          return "Nhân Viên";
      }
    };

    // Initialize new Object before utilizing its method
    let nhanVienMoi = new NhanVien(
      item.taiKhoan,
      item.hoTen,
      item.email,
      item.matKhau,
      item.ngayLam,
      item.luongCoBan,
      item.chucVu,
      item.gioLam
    );

    // Create table for renderring
    let contentTr = `
      <tr>
        <td>${nhanVienMoi.taiKhoan}</td>
        <td>${nhanVienMoi.hoTen}</td>
        <td>${nhanVienMoi.email}</td>
        <td>${nhanVienMoi.ngayLam}</td>
        <td>${transformPosition()}</td>
        <td>${nhanVienMoi.tongLuong()}</td>
        <td>${nhanVienMoi.xepLoai()}</td>
        <td>
          <button
            class="btn-primary text-white mb-3"
            data-toggle="modal"
            data-target="#myModal"
            onclick="editNV('${nhanVienMoi.taiKhoan}')"
          >
            <em class="fa fa-pencil"></em>
          </button>
          <button
            class="btn-warning text-white"
            onclick="deleteNV('${nhanVienMoi.taiKhoan}')"
          >
            <em class="fa fa-trash"></em>
          </button>
        </td>
      </tr>
    `;
    contentHTML += contentTr;
  });
  document.getElementById("tableDanhSach").innerHTML = contentHTML;
};

// Save Local Storage
export const nhanVienLocal = "nhanVienLocal";
export const saveLocal = (array) => {
  let json = JSON.stringify(array);
  localStorage.setItem(nhanVienLocal, json);
};

// Check only Validation Account
export const checkValidAccount = (account) => {
  const accountValid =
    checkEmpty(account, "tbTKNV") &&
    checkNumber(account, "tbTKNV") &&
    checkLength(account, "tbTKNV", 4, 6) &&
    checkDuplicate(account, danhSachNhanVien, "tbTKNV");

  return accountValid;
};

// Check other validation
export const checkValidOther = (
  name,
  email,
  password,
  onBoardDay,
  basic,
  position,
  workTime
) => {
  const nameValid = checkEmpty(name, "tbTen") && checkWord(name, "tbTen");
  const emailValid =
    checkEmpty(email, "tbEmail") && checkEmail(email, "tbEmail");
  const passwordValid =
    checkEmpty(password, "tbMatKhau") && checkPassword(password, "tbMatKhau");
  const onBoardDayValid =
    checkEmpty(onBoardDay, "tbNgay") && checkValidDate(onBoardDay, "tbNgay");
  const basicValid =
    checkEmpty(basic, "tbLuongCB") &&
    checkNumber(basic, "tbLuongCB") &&
    checkRangeNumber(basic, "tbLuongCB", 1000000, 20000000);
  const positionValid = checkPosition(position, "tbChucVu");
  const workTimeValid =
    checkEmpty(workTime, "tbGiolam") &&
    checkNumber(workTime, "tbGiolam") &&
    checkRangeNumber(workTime, "tbGiolam", 80, 200);

  if (
    nameValid &&
    emailValid &&
    passwordValid &&
    onBoardDayValid &&
    basicValid &&
    positionValid &&
    workTimeValid
  ) {
    return true;
  } else return false;
};

// Reset Thông Tin Form User
export const resetForm = () => {
  const inputs = document.querySelectorAll(".input-sm");
  for (let input of inputs) {
    input.value = "";
  }
  document.getElementById("chucvu").selectedIndex = 0;
  const notifications = document.querySelectorAll(".sp-thongbao");
  for (let notification of notifications) {
    notification.innerText = "";
    notification.style.display = "none";
  }
  document.getElementById("tknv").disabled = false;
  const date = new Date();
  document.getElementById("datepicker").value =
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "/" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    "/" +
    date.getFullYear();
};

// Find out Index NV in Array danhSachNhanVien
export const findIndexNV = (index) => {
  return danhSachNhanVien.findIndex((item) => {
    return item.taiKhoan === index;
  });
};

// Sort NhanVien
export const sortNV = (type) => {
  const x = Number();
  if (type === 1) {
    // Increase
    danhSachNhanVien.sort((a, b) => {
      const x = Number(a.taiKhoan);
      const y = Number(b.taiKhoan);
      if (x < y) return -1;
      else if (x > y) return 1;
      else return 0;
    });
  } else {
    // Decrease
    danhSachNhanVien.sort((a, b) => {
      const x = Number(a.taiKhoan);
      const y = Number(b.taiKhoan);
      if (x < y) return 1;
      else if (x > y) return -1;
      else return 0;
    });
  }
};
