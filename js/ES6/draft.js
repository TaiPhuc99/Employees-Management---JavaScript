let currentPage = 1;

// Pagnation
// const totalNV = array.length;
// const trNum = 3;
// let ulPagnation = "";
// const totalPageNum = Math.floor(totalNV / trNum);

// for (let i = 0; i < totalPageNum; i++) {
//   let contenLi = `
//   <li>
//     <a class="page-link" id="Trang_${i + 1}">${i + 1}</a>
//   </li>
// `;
//   ulPagnation += contenLi;
//   // loadPage("Trang_" + i + 1);
// }
// document.getElementById("ulPhanTrang").innerHTML = ulPagnation;
// const start = (currentPage - 1) * trNum;
// const end = currentPage * trNum;
const loadPage = (idPage) => {
  document.getElementById(idPage).addEventListener("click", () => {
    const id = idPage;
    const tempArr = id.split("_");
    currentPage = tempArr[1];
    renderListNV(danhSachNhanVien);
  });
};
