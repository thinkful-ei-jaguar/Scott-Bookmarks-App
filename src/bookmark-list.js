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
           <select name="ratings" id="foo">
             <option value="">Filter By Rating</option>
             <option value="5">5 Stars</option>
             <option value="4">4 Stars</option>
             <option value="3">3 Stars</option>
             <option value="2">2 Stars</option>
             <option value="1">1 Star</option>
           </select>
          `;
      
  $('.controls').html(html); //accessing the main from index.html and inputing the html variable we just created
}

    
function addFormTemplate() {
  return `
        <form id='add-new-bookmark'>
          <h4 class='form-title'>What would you like to bookmark?</h4>
          <section role="region">
            <div class='user-input'>
              <label class='form-title' for="bookmark-title">Title: </label>
              <input type="text" name="title" id="bookmark-title" required>
            </div>
            <div class='user-input'>
              <label class='form-url' for="url">URL: </label>
              <input type="url" name="url" id="url" placeholder="https://example.com" pattern="https://.*" value="https://" required>
            </div>
            <div class='user-input'>
              <label class='form-description' for="description" >Description: </label>
              <input type="text" name="desc" id="description" required>
            </div>
          <div class='form-center'>
            <select name="rating" id="rating-dropdown" required>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
            <div id="form-buttons">
              <button type="submit">Submit</button>
              <button type="button" id="cancel-add">Cancel</button>
            </div>
          </div>
        </form>
        `;
}

    
const handleAddFormClicked = function() {
  $('.controls').on('click', '.add-bookmark', function() {
    store.store.adding = true;
    render();
  });
};
      
const handleCancelButtonOnAddForm = function() {
  $('main').on('click', '#cancel-add', function() {
    store.store.adding = false;
    render();
  });
};


// const getBookmarkStarElement =  function(bookmark) {
//   let starNum = '';
//   let stars;

//   for (let i = 0; i < 5; i++) {
//     if(bookmark.rating > 0){
//       stars = '<i class="fa fa-star glow" aria-hidden="true"></i>';
//       bookmark.rating -= 1;
//     } else {
//       stars ='<i class="fa fa-star" aria-hidden="true"></i>';
//     }
//     starNum += stars;
//   }
//   return starNum;
// };




const getBookmarkElement = function (bookmark) {
  let bookmarkElement;
  if(bookmark.expanded) {
    bookmarkElement = `
       <li class='fullBookmark' data-item-id="${bookmark.id}">
          <span id="title">${bookmark.title}</span>
          <div id="rating"> ${bookmark.rating} </div>
            <span class="description">Description: ${bookmark.desc}</span>
            <a href="${bookmark.url}" type='url' class="url-link" title="Go to this book here" target="_blank">Visit Site</a>
            <button class="btn-delete"><i class="fa fa-trash" id="trash"></i></button>

       </li>
      `; 
  } else {
    bookmarkElement = `
  <li class='fullBookmark' data-item-id="${bookmark.id}">
     <span id="title">${bookmark.title}</span>
     <div id="rating"> ${bookmark.rating} </div>
  </li>
   `;
  }
  return bookmarkElement;
};

const getBookmarkString = function (bookmarkList) {
  const bookmarks = bookmarkList.map((element) => getBookmarkElement(element));
  return bookmarks.join('');
};

// const generateError = function() {};
//const renderError = function () {};
// const handleCloseError = function () {};


const handleFilterDropdown = function() {
  console.log('conceptName');
  $( '#foo' ).change(function() {
    let conceptName = $('#foo').find(':selected').text();
    console.log(conceptName);
    //if the filter number is equal to 
    // if() {
    //   render();
    // }
  });
};



const render = function () {
  let bookmarks = [...store.store.bookmarks];
  // let bookmarks = store.store.bookmarks.filter(bookmark => bookmark.rating >= store.store.bookmarks.rating);
  

  
  
  if(store.store.adding === true){
    const formHTML = addFormTemplate();
    $('main').html(formHTML);
    // return addFormTemplate();
  } else {
    $('main').html('');
    const bookmarkListString = getBookmarkString(bookmarks);
    $('#bookmark-list').html(bookmarkListString);
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
      });
  });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('li')
    .data('item-id');
};


const handleBookmarkElementClickForExpansion = function() {
  $('#bookmark-list').on('click', '.fullBookmark', event => {
    // event.preventDefault(); prevent default behavior on form or buttons
    console.log("expanded click");
    let id = getItemIdFromElement(event.currentTarget);
    console.log(id);
    store.findAndExpand(id);
    render();
  });
};


const handleDeleteBookmarkClicked = function() {
  $('#bookmark-list').on('click', '.btn-delete', event => {
    const id = getItemIdFromElement(event.currentTarget);
    console.log('deleted', id);

    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
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
  handleFilterDropdown();
};

// This object contains the only exposed methods from this module:
export default {
  render,
  bindEventListeners,
};