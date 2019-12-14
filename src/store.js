//this module seems to be handling functions regarding the store?


const bookmarks = [];
let error = null;
let filter = 0;


const findById = function(id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = function (bookmark) {
  this.bookmarks.push(bookmark);
};

const findAndDelete = function(id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};


const setError = function (error) {
  this.error = error;
};
  
export default {
  bookmarks,
  error,
  filter,
  findById,
  addBookmark,
  findAndDelete,
  setError
};







// const store = {
//   bookmarks: [
//     {
//       id: '7ddr',
//       title: 'Title 11',
//       rating: 5,
//       url: 'http://www.title11.com',
//       description: 'lorem ipsum dolor',
//       expanded: true
//     }
//   ],
//   adding: false,
//   error: null,
//   filter: 0
// };