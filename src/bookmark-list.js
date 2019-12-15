//this module focuses on updating the store only
//which will then be displayed to the DOM
//functions that act as an interface to the api.



import $ from 'jquery';

import store from './store';
import api from './api';


const getBookmarkElement = function () {
  if(store.store.expanded === true) {
    return `
      <li class='new-bookmark-expanded' data-item-id="${store.store.bookmarks.id}">
      <span id="title">${store.store.bookmarks.title}</span>
      <span id="rating">${store.store.bookmarks.rating}</span>
      </li>
      <span class="description">${store.store.bookmarks.description}</span>
      <a href="${store.store.bookmarks.url}" class="url-link" title="Go to this book here" target="_blank">Visit Site</a>
      <button class="btn"><i class="fa fa-trash" id="trash"></i></button>
    `;
  } else {
    return `
    <li class='new-bookmark'>
    <span id="title">${store.store.bookmarks.title}</span>
    <span id="rating">${store.store.bookmarks.rating}</span>
  </li>
      `;
  }
};

    

const getBookmarkString = function (bookmarkList) {
  const bookmarks = bookmarkList.map((element) => getBookmarkElement(element));
  return bookmarks.join('');
};



const render = function () {
  let bookmarks = [...store.store.bookmarks];
  const bookmarkListString = getBookmarkString(bookmarks);
  $('#bookmark-list').html(bookmarkListString);
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
        // renderError();
        store.store.adding = false;
        render();
      });
  });
};

//handleEditBookmarkSubmit will listen for when a user wants to
//edit a bookmark item

const handleEditBookmarkSubmit = function () {
  $('.main').on('submit', '.new-bookmark', event => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    const itemName = $(event.currentTarget).find('.shopping-item').val();
    api.updateItem(id, { name: itemName })
      .then(() => {
        store.findAndUpdate(id, { name: itemName });
        render();
      });
  });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.new-bookmark-expanded')
    .data('item-id');
};

const handleDeleteBookmarkClicked = function() {
  $('.new-bookmark-expanded').on('click', '#trash', event => {
    const id = getItemIdFromElement(event.currentTarget);

    api.deleteBookmark(id)
      .then(res => res.json())
      .then(() => {
        store.findAndDelete(id);
        render();
      });
  });
};

//This is an event listener binding function, 
//making them accessible on the DOM

const bindEventListeners = function () {
  getBookmarkElement();
  handleSubmitButtonOnAddForm();
  handleEditBookmarkSubmit();
  handleDeleteBookmarkClicked();
};


export default {
  render,
  bindEventListeners,
};