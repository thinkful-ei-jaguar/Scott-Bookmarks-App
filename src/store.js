//this module contains the client-side data cache(bookmarks array) 
//and functions that manipulate it(for example, 
//if you wanted to have search or filter on your bookmarks list)

// const store = {
//   bookmarks: [
//     {
//       id: 'bi420',
//       title: 'Test Title 1',
//       rating: 2,
//       url: 'http://www.yahoo.com',
//       description: 'A LOCAL test object that links to Yahoo',
//       expanded: true
//     },
//     {
//       id: 'bi420',
//       title: 'Definitely not Yahoo',
//       rating: 5,
//       url: 'http://www.yahoo.com',
//       description: 'A LOCAL test object that links to Yahoo',
//       expanded: true
//     }
//   ],
//   adding: true,
//   error: null,
//   filter: 0
// };


//findById will find a book myt the specific id 

const findById = function(id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

//addBookmark will add the bookmark to the store(bookmarks)

const addBookmark = function (bookmark) {
  this.bookmarks.push(bookmark);
};

//findAndDelete will delete a bookmark from the local store

const findAndDelete = function(id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

//findAndUpdate will change a bookmark currently in the local store

const findAndUpdate = function (id, newData) {};


const filterBookmarkList = function() {

};


//setError updates the error in the local store showing 
//what has been sent to the api error function

const setError = function (error) {
  this.error = error;
};


export default {
//   bookmarks,
//   error,
//   filter,
  findById,
  addBookmark,
  findAndDelete,
  findAndUpdate,
  filterBookmarkList,
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