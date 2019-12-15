//this module focuses on updating the store only
//which will then be displayed to the DOM
//functions that act as an interface to the api.



import $ from 'jquery';

import store from './store';
import api from './api';



//use api to get all the bookmarks
//api.getBookmarks
//put the bookmarks in STORE
//generate the bookmarks string
// retrieve the data from the server, empty the store.bookmarks, 
// fill store.bookmarks with the data from the server.

function getAllBookMarks() {
  api.getBookmarks();
  store.bookmarks.empty();
   
}

//getBookmarkListString(), getBookMarkString(bookmark) 
//for iterating through the store.bookmarks, 
//and turning each bookmark into a <li> element string, 
//concatenate these into one long string and return it.


//generateBookmarkElement will create the html to add to the bookmark list 
// it returns a single li html element based on the single bookmark

const generateBookmarkElement = function(bookmark) {
  if(bookmark.expanded) {
    return `
    <li>
    <span id="title">${bookmark.title}</span>
    <span id="rating">${bookmark.rating}</span>
  </li>
    <span class="description">This is a website and it is cooool. Hopefully you don't write too much about this website so it fills up the box and it doesn't fit! I'm going to keep typing to test that now!!!</span>
    <a href="https://www.w3schools.com/html/" class="url-link" title="Go to this book here" target="_blank">Visit Site</a>
    <button class="btn"><i class="fa fa-trash"></i></button>
    `;
  } else {
    return `
    <li>
      <span id="title">${bookmark.title}</span>
      <span id="rating">${bookmark.rating}</span>
    </li>
    `;
  }
};

  
//generateBookmarkListString will string together 
//each of the li html's and join them as one list

const generateBookmarkListString = function(element) {
  //loop through the booksmarks in the store
  const bookmarks = element.map((bookmark) => generateBookmarkElement(bookmark));
  return bookmarks.join('');
};
  //for each bookmark create a list item string





//generateError will create the html to display the error message

const generateError = function (message) {};

//renderError checks the store to see if there is an error
//if there is one, it passes it to generateError

const renderError = function () {};

//handleCloseError just listens on the error message 
//for when the user closes it
  
const handleCloseError = function () {};

//render is X

const render = function () {
  let bookmarks = store.bookmarks;

  if (store.store.adding) {
    return generateAddBookmarkString();
  }

  const bookmarkString = generateBookmarkListString(bookmarks);

  $('.bookmark-list').html(bookmarkString);

};

//handleNewBookmarkSubmit listens for a user to click 'add bookmark'

const handleNewBookmarkSubmit = function () {};


//getItemIdFromElement returns .data about an item...will have to return to this one

const getItemIdFromElement = function () {};


//handleDeleteBookmarkClicked will listen for when a user deletes
//a bookmark item

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



//handleEditBookmarkSubmit will listen for when a user wants to
//edit a bookmark item

const handleEditBookmarkSubmit = function () {};


//This is an event listener binding function, 
//making them accessible on the DOM

const bindEventListeners = function () {
  generateBookmarkListString();
  generateBookmarkElement();
  // generateExpandedBookmarkElement();
  // handleFilterDropdownClicked();
  // handleSubmitAddBookmarkButton();
  // handleExpandViewButtonClicked();
  // expandedBookmarkListTemplate();
  handleDeleteItemClicked();

};


export default {
  bindEventListeners
};