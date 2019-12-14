//this module focuses on updating the store only
//which will then be displayed to the DOM

//this function is for

import $ from 'jquery';

import store from './store';
import api from './api';


// function getAllBookMarks() {
//   //use api to get all the bookmarks
//   //api.getAllBookmarks
//   //put the bookmarks in STORE
//   //generate the bookmarks string
// }



const generateBookmarkElement = function(bookmark) {
  //single li html element based on the single bookmark
  return `
          <li>
            <span id="title">SAMPLE BOOKMARK</span>
            <div id="stars">
              <form action="">
                <input class="star star-5" id="star-5" type="radio" name="star" />
                <label class="star star-5" for="star-5"></label>
                <input class="star star-4" id="star-4" type="radio" name="star" />
                <label class="star star-4" for="star-4"></label>
                <input class="star star-3" id="star-3" type="radio" name="star" />
                <label class="star star-3" for="star-3"></label>
                <input class="star star-2" id="star-2" type="radio" name="star" />
                <label class="star star-2" for="star-2"></label>
                <input class="star star-1" id="star-1" type="radio" name="star" />
                <label class="star star-1" for="star-1"></label>
              </form>
            </div>
          </li>
      `;
};

const generateExpandedBookmarkElement = function() {
  return `
          <li class="expanded">
              <span id="title">Bookmark 1</span>
              <div id="stars">
                <form action="">
                  <input class="star star-5" id="star-5" type="radio" name="star" />
                  <label class="star star-5" for="star-5"></label>
                  <input class="star star-4" id="star-4" type="radio" name="star" />
                  <label class="star star-4" for="star-4"></label>
                  <input class="star star-3" id="star-3" type="radio" name="star" />
                  <label class="star star-3" for="star-3"></label>
                  <input class="star star-2" id="star-2" type="radio" name="star" />
                  <label class="star star-2" for="star-2"></label>
                  <input class="star star-1" id="star-1" type="radio" name="star" />
                  <label class="star star-1" for="star-1"></label>
                </form>
              </div>
              <span class="description">This is a website and it is cooool. Hopefully you don't write too much about this website so it fills up the box and it doesn't fit! I'm going to keep typing to test that now!!!</span>
              <a href="https://www.w3schools.com/html/" class="url-link" title="Go to this book here" target="_blank">Visit Site</a>
        <button class="btn"><i class="fa fa-trash"></i></button>
            </li>
      `;
};
  

const generateBookmarkListString = function(bookmarkList) {
  //loop through the booksmarks in the store
  const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
  return bookmarks.join('');
};
  //for each bookmark create a list item string








const generateError = function (message) {
  return `
        <section class="error-content">
          <button id="cancel-error">X</button>
          <p>${message}</p>
        </section>
      `;
};

const renderError = function () {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
};
  
const handleCloseError = function () {
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};

const render = function () {
  renderError();
  // Filter item list if store prop is true by item.checked === false
  let items = [...store.items];
  if (store.hideCheckedItems) {
    items = items.filter(item => !item.checked);
  }
  
  // render the shopping list in the DOM
  const shoppingListItemsString = generateShoppingItemsString(items);
  
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
};

const handleDeleteItemClicked = function () {
  // like in `handleItemCheckClicked`, we use event delegation
  $('bookmark-list').on('click', '.js-bookmark-delete', event => {
    // get the index of the item in store.items
    const id = getItemIdFromElement(event.currentTarget);
      
    api.deleteItem(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        renderError();
      });
  });
};

const bindEventListeners = function () {
  generateBookmarkListString();
  generateBookmarkElement();
  generateExpandedBookmarkElement();
  handleFilterDropdownClicked();
  handleSubmitAddBookmarkButton();
  handleExpandViewButtonClicked();
  expandedBookmarkListTemplate();
  handleDeleteItemClicked();

};


export default {
  bindEventListeners
};