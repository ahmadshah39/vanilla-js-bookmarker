import "../css/style.css";
// fetching The Form Element from DOM
const form = document.querySelector("#bookmarkform");
// fetching The BookMark list container from DOM
const bookMarkList = document.querySelector(".bookMarkList");
// Initializing Bookmarks Array;
let bookMarks = [];

// Saveing Bookmarks to local Storage re-rendering bookmark List
const saveBookMark = (e) => {
  e.preventDefault();
  //  fetching FormInputs
  const siteName = form.sitename.value;
  const siteUrl = form.siteurl.value;

  //  validating FormInputs
  if (!validateForm(siteName, siteUrl)) {
    return false;
  }
  //  creating New bookmark object
  let bookMark = {
    name: siteName,
    url: siteUrl,
  };
  // pushing bookmark object to bookmarks array
  bookMarks.push(bookMark);
  // setting bookmarks array to localstorage
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  // re-rendering bookmarks inside the DOM

  form.sitename.value = "";
  form.siteurl.value = "";
  fetchBookMarks();
};

// deleting a bookmark
const deleteBookMark = (index) => {
  // Removing bookmark from the bookMarks array using passed index
  bookMarks.splice(index, 1);
  // setting bookMarks array to localStorage
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  // re-rendering bookmarks inside the DOM
  fetchBookMarks();
};

// fetching bookmarks array form local storage and inserting in to DOM
const fetchBookMarks = () => {
  // Over-riding BookMarks Array based on localStorage
  if (localStorage.getItem("bookMarks") === null) {
    bookMarks = [];
  } else {
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
  }
  // initializing an empty variable List
  let list = "";
  if (bookMarks !== null) {
    // putting html block for each bookmark inside list varible
    bookMarks.forEach((bookMark, index) => {
      list += `<div
          class="
          item
          flex
          justify-between
          px-2
          py-2
          mb-1
          rounded
          items-center
          bg-gray-200
          text-gray-700
          "
          >
          <h2 class="text-xl">${bookMark.name}</h2>
          <div>
          <a
          href="${bookMark.url}"
          target="_blank"
          class="
          px-2
          py-1
          bg-blue-400
          text-white
          rounded
          mr-2
          focus:outline-none
          focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
          "
          ><i class="fas fa-location-arrow"></i
          ></a>
          <a
          href="#!"
          class="
          px-2
          py-1
          bg-red-700
          text-white
          rounded
          focus:outline-none
          focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
          delete
          "
          data-index="${index}"
          ><i class="fas fa-trash trash"></i
          ></a>
          </div>
          </div>`;
    });
  }
  // inserting list into DOM
  document.querySelector(".bookMarkList").innerHTML =
    list !== ""
      ? list
      : `<p class="text-center text-xl text-gray-500">You dont have any bookmarks yet! Add one</p>`;
};

// validating inputs
const validateForm = (siteName, siteUrl) => {
  //checking the empty variables
  if (!siteName || !siteUrl) {
    alert("Please Fill in the Correct Values");
    return false;
  }
  //Creating a RegExp for urls
  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  //matching inputs against regExp
  if (!siteUrl.match(regex) || !siteName.match(/\w/)) {
    alert("Please use a valid URL");
    return false;
  }

  return true;
};
// Initial Render of bookmars into DOM
fetchBookMarks();
// Triggering the Savebookmark functions
form.addEventListener("submit", saveBookMark);
// Triggering the deleteBookMarks function
bookMarkList.addEventListener("click", (e) => {
  let item = e.target;
  if (item.classList.contains("delete")) {
    e.preventDefault();
    deleteBookMark(item.getAttribute("data-index"));
  }
  if (item.classList.contains("trash")) {
    deleteBookMark(item.parentElement.getAttribute("data-index"));
  }
});
