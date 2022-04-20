import {
  getInfo,
  renderListNV,
  nhanVienLocal,
  saveLocal,
  checkValidAccount,
  checkValidOther,
  resetForm,
  sortNV,
  callModal,
  findIndexNV,
} from "./controller.js";
import { NhanVien, xepLoaiNV } from "./model.js";

// Initialize
export let danhSachNhanVien = [];
let json = localStorage.getItem(nhanVienLocal);
if (json) {
  danhSachNhanVien = JSON.parse(json);
  renderListNV(danhSachNhanVien);
}

// Calling Modal
document.getElementById("btnThem").addEventListener("click", () => {
  callModal("THÊM NHÂN VIÊN", 1);
});

// Add newNV
document.getElementById("btnThemNV").addEventListener("click", () => {
  let valueForm = getInfo();

  // Create newObject from above values
  let newNV = new NhanVien(
    valueForm.account,
    valueForm.name,
    valueForm.email,
    valueForm.password,
    valueForm.onBoardDay,
    valueForm.basic,
    valueForm.position,
    valueForm.workTime
  );

  // Validation all inputs
  const checkValueAccount = checkValidAccount(newNV.taiKhoan);
  const checkValueOther = checkValidOther(
    newNV.hoTen,
    newNV.email,
    newNV.matKhau,
    newNV.ngayLam,
    newNV.luongCoBan,
    newNV.chucVu,
    newNV.gioLam
  );

  if (checkValueAccount && checkValueOther) {
    danhSachNhanVien.push(newNV);
    saveLocal(danhSachNhanVien);
    renderListNV(danhSachNhanVien);
    resetForm();
  }
});

// Delete NhanVien
export const deleteNV = (taiKhoan) => {
  // Check vị trí của taiKhoan đã có/không trong danhSachNhanVien
  const index = findIndexNV(taiKhoan);
  console.log(index);
  console.log(taiKhoan);
  // console.log(danhSachNhanVien[0].taiKhoan);
  if (index !== -1) {
    danhSachNhanVien.splice(index, 1);
    saveLocal(danhSachNhanVien);
    renderListNV(danhSachNhanVien);
  }
};
window.deleteNV = deleteNV;

// Edit Button => back data NV selected
export const editNV = (taiKhoan) => {
  // Calling Modal First
  callModal("CẬP NHẬT NHÂN VIÊN", 2);

  // Check vị trí của taiKhoan đã có/không trong danhSachNhanVien
  const index = findIndexNV(taiKhoan);
  if (index !== -1) {
    const nhanVien = danhSachNhanVien[index];
    document.getElementById("tknv").value = nhanVien.taiKhoan;
    document.getElementById("tknv").disabled = true;
    document.getElementById("name").value = nhanVien.hoTen;
    document.getElementById("email").value = nhanVien.email;
    document.getElementById("password").value = nhanVien.password;
    document.getElementById("datepicker").value = nhanVien.ngayLam;
    document.getElementById("luongCB").value = nhanVien.luongCoBan;
    document.getElementById("chucvu").selectedIndex = nhanVien.chucVu;
    document.getElementById("gioLam").value = nhanVien.gioLam;
  }
};
window.editNV = editNV;

// Update NV
document.getElementById("btnCapNhat").addEventListener("click", () => {
  // Get taiKhoan of current Value
  const account = document.getElementById("tknv").value;
  console.log(account);
  // Check vị trí của taiKhoan đã có/không trong danhSachNhanVien
  const index = findIndexNV(account);
  console.log(index);

  if (index !== -1) {
    let valueForm = getInfo();

    // Create newObject from above values
    let newNV = new NhanVien(
      valueForm.account,
      valueForm.name,
      valueForm.email,
      valueForm.password,
      valueForm.onBoardDay,
      valueForm.basic,
      valueForm.position,
      valueForm.workTime
    );
    const checkValueOther = checkValidOther(
      newNV.hoTen,
      newNV.email,
      newNV.matKhau,
      newNV.ngayLam,
      newNV.luongCoBan,
      newNV.chucVu,
      newNV.gioLam
    );
    if (checkValueOther) {
      danhSachNhanVien[index] = newNV;
      saveLocal(danhSachNhanVien);
      renderListNV(danhSachNhanVien);
      resetForm();
      document.getElementById("tknv").disabled = false;
    }
  }
});

// Search NV
document.getElementById("searchName").addEventListener("keyup", () => {
  // Get keywod value from input Search
  const keyword = document
    .getElementById("searchName")
    .value.trim()
    .toUpperCase();

  // Initalize empty array && check danhSachNhanVien by conditions && push newNV if exists
  let listResult = [];
  danhSachNhanVien.forEach((item) => {
    const newNhanVien = new NhanVien(
      item.taiKhoan,
      item.hoTen,
      item.email,
      item.matKhau,
      item.ngayLam,
      item.luongCoBan,
      item.chucVu,
      item.gioLam
    );
    if (newNhanVien.xepLoai().includes(keyword)) {
      listResult = [...listResult, newNhanVien];
    }
  });

  // Render again newArray
  renderListNV(listResult);
});

// Sort NV Increase
document.getElementById("SapXepTang").addEventListener("click", () => {
  document.getElementById("SapXepTang").style.display = "none";
  document.getElementById("SapXepGiam").style.display = "inline";
  sortNV(1);
  renderListNV(danhSachNhanVien);
});

// Sort NV Decrease
document.getElementById("SapXepGiam").addEventListener("click", () => {
  document.getElementById("SapXepTang").style.display = "inline";
  document.getElementById("SapXepGiam").style.display = "none";
  sortNV(-1);
  renderListNV(danhSachNhanVien);
});

// Close <=> Reset Form
document.getElementById("btnDong").addEventListener("click", () => {
  resetForm();
});
