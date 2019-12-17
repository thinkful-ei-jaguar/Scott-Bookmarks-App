
import $ from 'jquery';

import './index.css';
import api from './api';
import store from './store';
import bookmark from './bookmark-list';


const main = function() {
    
  api.getBookmarks()
    .then(res => res.json())
    .then((bookmarks) => {
      console.log(bookmarks);
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      bookmark.render();
    });
  bookmark.bindEventListeners();
};

$(main);

