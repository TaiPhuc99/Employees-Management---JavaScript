import {
  getInfo,
  renderListNV,
  nhanVienLocal,
  saveLocal,
  checkValid,
} from "./controller.js";
import { xepLoaiNV, NhanVien } from "./model.js";

// Initialize
export let danhSachNhanVien = [];
let json = localStorage.getItem(nhanVienLocal);
if (json) {
  danhSachNhanVien = JSON.parse(json);
  renderListNV(danhSachNhanVien);
}

// Add newNV
document.getElementById("btnThemNV").addEventListener("click", () => {
  let valueForm = getInfo();
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

  const checkValue = checkValid(
    newNV.taiKhoan,
    newNV.hoTen,
    newNV.email,
    newNV.matKhau,
    newNV.ngayLam,
    newNV.luongCoBan,
    newNV.chucVu,
    newNV.gioLam
  );

  if (checkValue) {
    danhSachNhanVien.push(newNV);
    renderListNV(danhSachNhanVien);
    saveLocal(danhSachNhanVien);
  }
});