// Array Notification
export const xepLoaiNV = ["Xuất Sắc", "Giỏi", "Khá", "Trung Bình"];

// Class NV
export class NhanVien {
  constructor(
    _taiKhoan,
    _hoTen,
    _email,
    _matKhau,
    _ngayLam,
    _luongCoBan,
    _chucVu,
    _gioLam
  ) {
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
  }

  tongLuong() {
    checkPositionValue(this.chucVu);
  }

  xepLoai() {
    checkType(this.gioLam * 1);
  }
}

// Function tongLuong
export const checkPositionValue = (positionValue) => {
  switch (positionValue) {
    case 1:
      return NhanVien.luongCoBan * 3;
    case 2:
      return NhanVien.luongCoBan * 2;
    case 3:
      return NhanVien.luongCoBan * 1;
  }
};

// Function Sort Type
export const checkType = (type) => {
  if (type >= 192) return xepLoaiNV[0];
  else if (type >= 176) return xepLoaiNV[1];
  else if (type >= 160) return xepLoaiNV[2];
  else return xepLoaiNV[3];
};
