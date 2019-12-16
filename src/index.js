//index.js is for interacting with the html. click handlers go here. 
//render functions go here also. 
//the functions in index.js should basically just be 
//calling functions from bookmarks.js. 
//for example, in index.js have a 
//function renderBookmarksList() -> this would call getBookMarkListString 
//from bookmarks.js to get the a string of all the current bookmarks, 
//and attach it to the <ul> element via jquery. 
//basically, all your jquery will be in index.js


import $ from 'jquery';

import './index.css';
import api from './api';
import store from './store';
import bookmark from './bookmark-list';


function renderHomePage() {
  const html = `
        <button class="add-bookmark">
        Add Bookmark
       </button>
           <select name="ratings" id="filter-button">
             <option value="">Filter By Rating</option>
             <option value="5" >5 Stars</option>
             <option value="4">4 Stars</option>
             <option value="3">3 Stars</option>
             <option value="2">2 Stars</option>
             <option value="1">1 Star</option>
           </select>
          `;
      
  $('.main').html(html); //accessing the main from index.html and inputing the html variable we just created
}

    
function addFormTemplate() {
  if (store.store.booksmarks.adding) { 
    return `
        <form id='add-new-bookmark'>
          <h2 class='form-title'>What would you like to bookmark?</h2>
          <section class='form-right' role="region">
            <div class='user-input'>
              <label for="bookmark-title">Title: </label>
              <input type="text" name="title" id="bookmark-title" required>
            </div>
            <div class='user-input'>
              <label for="url">URL: </label>
              <input type="url" name="url" id="url" placeholder="http://example.com" value="https://" required>
            </div>
            <div class='user-input'>
              <label for="description">Description: </label>
              <input type="text" name="description" id="description" required>
            </div>
          <div class='form-center'>
            <select name="rating" id="rating-dropdown" required>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">5 stars</option>
              <option value="5">5 stars</option>
            </select>
            <div id="form-buttons">
              <button type="submit">Submit</button>
              <button type="button" id="js-add-cancel">Cancel</button>
            </div>
          </div>
        </form>
        `;
  }
}
    
const handleAddFormClicked = function() {
  $('.main').on('click', '.add-bookmark', function() {
    $('.main').prepend(addFormTemplate());
  });
};
      
const handleCancelButtonOnAddForm = function() {
  $('.main').on('click', '#js-add-cancel', function() {
    renderHomePage();
  });
};

  


function bookmarkHandler() {
  renderHomePage();
  addFormTemplate();
  //   renderBookmarkList();
  handleAddFormClicked();
  handleCancelButtonOnAddForm();
}
  
$(bookmarkHandler);

const main = function() {

    
  api.getBookmarks()
    .then(res => res.json())
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      bookmark.render();
    });
  bookmark.bindEventListeners();
};

$(main);

export default {
  addFormTemplate,


};