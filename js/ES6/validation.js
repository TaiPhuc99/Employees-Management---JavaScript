export const message = [
  "Không được để rỗng",
  "Độ dài tối thiểu",
  "Độ dài tối đa",
  "Tài khoản đã có, vui lòng nhập lại",
  "Trường này phải là ký tự",
  "Trường này phải là số",
  "Email không hợp lệ",
  "Password không hợp lệ",
  "Vui lòng chọn chức vụ",
  "Vui lòng nhập lương",
];

export const checkEmpty = (string, idErr) => {
  const valueEl = string.trim();
  if (valueEl.length > 0) {
    document.getElementById(idErr).style.display = "none";
    return true;
  } else {
    document.getElementById(idErr).innerText = message[0];
    document.getElementById(idErr).style.display = "block";
    return false;
  }
};

export const checkLength = (string, idErr, min, max) => {
  if (string.length < min) {
    document.getElementById(idErr).innerText = `${message[1]} là ${min} ký tự`;
    document.getElementById(idErr).style.display = "block";
    return false;
  } else if (string.length > max) {
    document.getElementById(idErr).innerText = `${message[2]} là ${max} ký tự`;
    document.getElementById(idErr).style.display = "block";
    return false;
  } else {
    document.getElementById(idErr).style.display = "none";
    return true;
  }
};

export const checkDuplicate = (idNew, array, idErr) => {
  const index = array.findIndex((item) => {
    return item.taiKhoan === idNew;
  });
  if (index !== -1) {
    document.getElementById(idErr).innerText = message[3];
    document.getElementById(idErr).style.display = "block";
    return false;
  } else {
    document.getElementById(idErr).style.display = "none";
    return true;
  }
};

export const checkWord = (string, idErr) => {
  const regexWord =
    "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
  // const regexWordvalid = regexWord.test(string);
  if (string.match(regexWord)) {
    document.getElementById(idErr).style.display = "none";
    return true;
  } else {
    document.getElementById(idErr).innerText = message[4];
    document.getElementById(idErr).style.display = "block";
    return false;
  }
};

export const checkNumber = (string, idErr) => {
  const regexNumber = /^[0-9]+$/;
  const valid = regexNumber.test(string);
  if (valid) {
    document.getElementById(idErr).style.display = "none";
    return true;
  } else {
    document.getElementById(idErr).innerText = message[5];
    document.getElementById(idErr).style.display = "block";
    return false;
  }
};

export const checkEmail = (string, idErr) => {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid = regexEmail.test(string);
  if (valid) {
    document.getElementById(idErr).style.display = "none";
    return true;
  } else {
    document.getElementById(idErr).innerText = message[6];
    document.getElementById(idErr).style.display = "block";
    return false;
  }
};

export const checkPassword = (string, idErr) => {
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  // "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,10}$";
  // "^(?=.*?[A-Z])(?=.*[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&amp;*-])(?=.{6,})$";
  const valid = regexPassword.test(string);
  if (valid) {
    document.getElementById(idErr).style.display = "none";
    return true;
  } else {
    document.getElementById(idErr).innerText = message[7];
    document.getElementById(idErr).style.display = "block";
    return false;
  }
};

export const checkPosition = (number, idErr) => {
  if (number === 0) {
    document.getElementById(idErr).innerText = message[8];
    document.getElementById(idErr).style.display = "block";
    return false;
  } else {
    document.getElementById(idErr).style.display = "none";
    return true;
  }
};

export const checkRangeNumber = (number, idErr, min, max) => {
  if (number < min) {
    document.getElementById(
      idErr
    ).innerText = `${message[9]} từ ${min} đến ${max} đồng`;
    document.getElementById(idErr).style.display = "block";
    return false;
  } else if (number > max) {
    document.getElementById(
      idErr
    ).innerText = `${message[9]} từ ${min} đến ${max} đồng`;
    document.getElementById(idErr).style.display = "block";
    return false;
  } else {
    document.getElementById(idErr).style.display = "none";
    return true;
  }
};
