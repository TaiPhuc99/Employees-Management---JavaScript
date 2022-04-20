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
import { danhSachNhanVien, deleteNV, findIndexNV, editNV } from "./main.js";

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
let currentPage = 1;
export const renderListNV = (array) => {
  // Pagnation
  const totalNV = array.length;
  const trNum = 3;
  let ulPagnation = "";
  const totalPageNum = Math.floor(totalNV / trNum);

  for (let i = 0; i < totalPageNum; i++) {
    let contenLi = `
    <li>
      <a class="page-link" id="Trang_${i + 1}">${i + 1}</a>
    </li>
  `;
    ulPagnation += contenLi;
    loadPage("Trang_" + i + 1);
  }
  document.getElementById("ulPhanTrang").innerHTML = ulPagnation;
  const start = (currentPage - 1) * trNum;
  const end = currentPage * trNum;

  let contentHTML = "";
  // Change selectedIndex <==> Value
  for (const index = start; index < end; index++) {
    const transformPosition = () => {
      const position = array[index].chucVu;
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
      array[index].taiKhoan,
      array[index].hoTen,
      array[index].email,
      array[index].matKhau,
      array[index].ngayLam,
      array[index].luongCoBan,
      array[index].chucVu,
      array[index].gioLam
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
  }
  document.getElementById("tableDanhSach").innerHTML = contentHTML;
};

// Save Local Storage
export const nhanVienLocal = "nhanVienLocal";
export const saveLocal = (array) => {
  let json = JSON.stringify(array);
  localStorage.setItem(nhanVienLocal, json);
};

// Check all Validation of all inputs
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

const loadPage = (idPage) => {
  document.getElementById(idPage).addEventListener("click", () => {
    const id = idPage;
    const tempArr = id.split("_");
    currentPage = tempArr[1];
    renderListNV(danhSachNhanVien);
  });
};
