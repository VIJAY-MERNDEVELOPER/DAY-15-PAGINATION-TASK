getData(1);
let pageSize = 10;

let firstButton = document.getElementById("first-btn");
let prevButton = document.getElementById("prev-btn");
let nextButton = document.getElementById("next-btn");
let lastButton = document.getElementById("last-btn");
let tbody = document.getElementById("table-body");
let pages = document.getElementsByClassName("page-num");
let currentPage;

let numPage;

function getData(page) {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
  );
  xhr.send();
  xhr.onload = function () {
    if (xhr.status == 200) {
      let response = JSON.parse(xhr.response);
      fetchData(response);
    }
  };

  function fetchData(response) {
    if (page == 1) {
      prevButton.style.visibility = "hidden";
    } else {
      prevButton.style.visibility = "visible";
    }

    currentPage = page;

    tbody.innerHTML = "";
    let totalpages = response.length / pageSize;

    let dataStart = (currentPage - 1) * pageSize;
    let dataEnd = dataStart + pageSize;

    for (let i = dataStart; i < dataEnd; i++) {
      tbody.innerHTML += ` <tr>
          <td>${response[i].id}</td>
          <td>${response[i].name}</td>
          <td>${response[i].email}</td>
          </tr> `;
    }

    if (page === totalpages) {
      nextButton.style.visibility = "hidden";
    } else {
      nextButton.style.visibility = "visible";
    }
  }
}

function prevBtn() {
  currentPage--;
  currentPage > 1 ? getData(currentPage) : getData(1);
}

function nextBtn() {
  currentPage++;
  currentPage > 1 ? getData(currentPage) : getData(1);
}
