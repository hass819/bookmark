

const submitBtn = document.getElementById('submitBtn');
const bookmarkNameInput = document.getElementById('bookmarkName');
const bookmarkURLInput = document.getElementById('bookmarkURL');
const tableContent = document.getElementById('tableContent');
const boxInfo = document.querySelector('.box-info');
const closeBtn = document.getElementById('closeBtn');

let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

function updateTable() {
  tableContent.innerHTML = '';

  bookmarks.forEach((bookmark, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${bookmark.name}</td>
      <td>
        <button class="btn btn-visit btn-success" onclick="visitSite(${index})">
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
      </td>
      <td>
        <button class="btn btn-delete btn-danger" onclick="deleteBookmark(${index})">
          <i class="fa-solid fa-trash-can "></i>   Delete
        </button>
      </td>
    `;
    tableContent.appendChild(row);
  });
}

function visitSite(index) {
  window.open(bookmarks[index].url, '_blank');
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1); 
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 
  updateTable(); 
}

function validateInputs(name, url) {
  const isValidName = name.length >= 3;
  const isValidURL = /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(url);

  if (!isValidName || !isValidURL) {
    boxInfo.classList.remove('d-none');
    return false;
  }
  boxInfo.classList.add('d-none');
  return true;
}

submitBtn.addEventListener('click', () => {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkURLInput.value.trim();

  if (validateInputs(name, url)) {
    bookmarks.push({ name, url });

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    bookmarkNameInput.value = '';
    bookmarkURLInput.value = '';

    updateTable();
  }
});

closeBtn.addEventListener('click', () => {
  boxInfo.classList.add('d-none');
});

updateTable();
