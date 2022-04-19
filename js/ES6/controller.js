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
} from "./validation.js";
import { danhSachNhanVien } from "./main.js";

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

    const transformTongLuong = (first) => {
      second;
    };

    let contentTr = `
      <tr>
        <td>${item.taiKhoan}</td>
        <td>${item.hoTen}</td>
        <td>${item.email}</td>
        <td>${item.ngayLam}</td>
        <td>${transformPosition()}</td>
        <td>${item.tongLuong}</td>
        <td>${item.xepLoai}</td>
        <td>
          <button class="btn-primary text-white mb-3" id="${item.taiKhoan}">
            <em class="fa fa-pencil"></em>
          </button>
          <button class="btn-warning text-white" id="${item.taiKhoan}">
            <em class="fa fa-trash"></em>
          </button>
        </td>
      </tr>
    `;
    contentHTML += contentTr;
    console.log(array);
  });

  document.getElementById("tableDanhSach").innerHTML = contentHTML;
};

// Save Local Storage
export const nhanVienLocal = "nhanVienLocal";
export const saveLocal = (array) => {
  let json = JSON.stringify(array);
  localStorage.setItem(nhanVienLocal, json);
};

export const checkValid = (
  account,
  name,
  email,
  password,
  onBoardDay,
  basic,
  position,
  workTime
) => {
  const accountValid =
    checkEmpty(account, "tbTKNV") &&
    checkNumber(account, "tbTKNV") &&
    checkLength(account, "tbTKNV", 4, 6) &&
    checkDuplicate(account, danhSachNhanVien, "tbTKNV");
  const nameValid = checkEmpty(name, "tbTen") && checkWord(name, "tbTen");
  const emailValid =
    checkEmpty(email, "tbEmail") && checkEmail(email, "tbEmail");
  const passwordValid =
    checkEmpty(password, "tbMatKhau") &&
    // checkPassword(password, "tbMatKhau") &&
    checkLength(password, "tbMatKhau", 6, 10);
  const onBoardDayValid = checkEmpty(onBoardDay, "tbNgay");
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
    accountValid &&
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
