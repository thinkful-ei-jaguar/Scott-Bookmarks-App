//this module focuses on updating the store only
//which will then be displayed to the DOM
//functions that act as an interface to the api.



import $ from 'jquery';

import store from './store';
import api from './api';
// import cuid from 'cuid';



function renderHomePage() {
  const html = `
        <button class="add-bookmark">
        Add Bookmark
       </button>
           <select name="ratings" id="dropdownSelect">
             <option value="">Filter By Rating</option>
             <option value="5">5 Stars</option>
             <option value="4">4 Stars+</option>
             <option value="3">3 Stars+</option>
             <option value="2">2 Stars+</option>
             <option value="1">1 Star+</option>
           </select>
          `;
  // $('.controls').html(html); //accessing the main from index.html and inputing the html variable we just created
  return html;
}

    
function addFormTemplate() {
  return `
        <form id='add-new-bookmark'>
          <h4 class='form-title'>What would you like to bookmark?</h4>
          <section role="region">
            <div class='user-input'>
              <label class='form-title' for="bookmark-title">TITLE: </label>
              <input type="text" name="title" placeholder="Title Example" id="bookmark-title" required>
            </div>
            <div class='user-input'>
              <label class='form-url' for="url">URL: </label>
              <input type="url" name="url" id="url" placeholder="https://example.com" pattern="https://.*"  required>
            </div>
            <div class='user-input'>
              <label class='form-description' for="description" >DESCRIPTION: </label>
              <input type="text" name="desc" placeholder="Example description for example.com!" id="description" required>
            </div>
          <div class='form-center'>
            <label class="form-rating-select" for="rating-dropdown"> BOOKMARK RATING: </label>
            <select name="rating" id="rating-dropdown" required>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
            <div id="form-buttons">
              <button class="submit-form-btn" type="submit">Submit</button>
              <button type="button" id="cancel-add">Cancel</button>
            </div>
          </div>
        </form>
        `;
}

    
const handleAddFormClicked = function() {
  $('main').on('click', '.add-bookmark', function() {
    store.store.adding = !store.store.adding;
    render();
  });
};
      
const handleCancelButtonOnAddForm = function() {
  $('main').on('click', '#cancel-add', function() {
    store.store.adding = false;
    render();
  });
};



const getBookmarkElement = function (bookmark) {
  let bookmarkElement;
  let starRatingHtml = '';
  let checkedCounter = 0;
  let totalStarCounter = 0;

  for(checkedCounter = 0; checkedCounter < bookmark.rating; checkedCounter++) {
    starRatingHtml = starRatingHtml + '<span class="fa fa-star checked"></span>';
    totalStarCounter++;
  }

  if (totalStarCounter < 5) {
    for(totalStarCounter; totalStarCounter < 5; totalStarCounter++) {
      starRatingHtml = starRatingHtml + '<span class="fa fa-star"></span>';
    }
  }

  if(bookmark.expanded) {
    bookmarkElement = `
       <li class='fullBookmark' aria-controls="fullBookmark" aria-expanded="true" data-item-id="${bookmark.id}">
          <span class="title">${bookmark.title}</span>
          <div class="rating">
            ${starRatingHtml}
          </div>
            <span class="description">Description: ${bookmark.desc}</span>
            <a href="${bookmark.url}" type='url' class="url-link" title="Go to this book here" target="_blank">Visit Site</a>
            <button class="btn-delete"><i class="fa fa-trash" id="trash"></i></button>
       </li>
      `; 
  } else {
    bookmarkElement = `
  <li class='fullBookmark' aria-controls="fullBookmark" aria-expanded="false" data-item-id="${bookmark.id}">
     <span class="title">${bookmark.title}</span>
     <div class="rating"> ${starRatingHtml} </div>
  </li>
   `;
  }
  return bookmarkElement;
};

const getBookmarkString = function (bookmarkList) {
  const bookmarks = bookmarkList.map((element) => getBookmarkElement(element));
  return bookmarks.join('');
};


const handleFilterDropdown = function() {
  console.log('conceptName');



  $( 'main' ).on('change', '#dropdownSelect', function() {
    let dropDownNumber = $('#dropdownSelect').find(':selected').val();
    console.log(dropDownNumber);
    if (dropDownNumber === '') {
      store.store.filter = 0;
    } else {
      store.store.filter = dropDownNumber;
    }
    render();
  });
};


//generateError will create the html to display the error message

const generateError = function (message) {
  return `
  <section class = 'error-content'>
      <p>Error!  The following error has occurred: ${message}</p>
      <button id='cancel-error'>Got it.</button>
    </section>
  `;
};

//renderError checks the store to see if there is an error
//if there is one, it passes it to generateError

const renderError = function () {
  if (store.store.error) {
    const el = generateError(store.store.error);    
    $('.error-container').html(el);  
  } else {
    $('.error-container').empty();
  }
};

//handleCloseError just listens on the error message 
//for when the user closes it

const handleCloseError = function () {
  $('.error-container').on('click', '#cancel-error', () => {
    store.store.setError(null);
    renderError();
  });
};

const render = function () {
  // renderError();
  let bookmarks = store.store.bookmarks.filter(bookmark => bookmark.rating >= store.store.filter);
  
  if(store.store.adding === true){
    const formHTML = addFormTemplate();
    $('main').html(`<nav class='controls'>${renderHomePage()}</nav>${formHTML}`);

  } else {
    $('main').html('');
    const bookmarkListString = getBookmarkString(bookmarks);
    $('main').html(`<nav class='controls'>${renderHomePage()}</nav><ul id='bookmark-list'>${bookmarkListString}</ul>`);
  }
};


let serializeJson = function(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
};


const handleSubmitButtonOnAddForm = function () {
  $('main').on('submit', '#add-new-bookmark', function (event) {
    event.preventDefault();

    let formElement = $('#add-new-bookmark')[0];
    console.log( serializeJson(formElement) );

    let newBookmarkAdd = serializeJson(formElement);

    api.createBookmark(newBookmarkAdd)
      .then(res => res.json())
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        store.store.adding = false;
        render();
      })
      .catch((error) => {
        store.store.setError(error.message);
        alert(`${error.message}`);
        renderError();
      });
  });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('li')
    .data('item-id');
};


const handleBookmarkElementClickForExpansion = function() {
  $('main').on('click', '.fullBookmark', event => {
    // event.preventDefault(); prevent default behavior on form or buttons
    console.log("expanded click");
    let id = getItemIdFromElement(event.currentTarget);
    console.log(id);
    store.findAndExpand(id);
    render();
  });
};

const handleBookmarkElementKeyboardPressForExpansion = function() {
  $('main').on('keypress', '.fullBookmark', event => {
    // event.preventDefault(); prevent default behavior on form or buttons
    console.log("expanded click");
    let id = getItemIdFromElement(event.currentTarget);
    console.log(id);
    store.findAndExpand(id);
    render();
  });
};


const handleDeleteBookmarkClicked = function() {
  $('main').on('click', '.btn-delete', event => {
    const id = getItemIdFromElement(event.currentTarget);
    console.log('deleted', id);

    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        store.store.setError(error.message);
        alert(`${error.message}`);
        renderError();
      });
  });
};








//This is an event listener binding function, 
//making them accessible on the DOM

const bindEventListeners = function () {
  renderHomePage();
  handleAddFormClicked();
  handleSubmitButtonOnAddForm();
  handleCancelButtonOnAddForm();
  handleDeleteBookmarkClicked();
  handleBookmarkElementClickForExpansion();
  handleBookmarkElementKeyboardPressForExpansion();
  handleFilterDropdown();
  handleCloseError();
};

// This object contains the only exposed methods from this module:
export default {
  render,
  bindEventListeners,
};