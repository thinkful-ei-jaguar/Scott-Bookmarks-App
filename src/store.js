//this module contains the client-side data cache(bookmarks array) 
//and functions that manipulate it(for example, 
//if you wanted to have search or filter on your bookmarks list)

const store = {
  bookmarks: [
    {
      id: 'bi420',
      title: 'Sample Bookmark 1',
      rating: 2,
      url: 'http://www.google.com',
      description: 'this links to google',
      expanded: false
    },
    {
      id: 'bi420',
      title: 'Sample Bookmark 2',
      rating: 5,
      url: 'http://www.google.com',
      description: 'this also links to google',
      expanded: false
    }
  ],
  adding: true,
  error: null,
  filter: 0
};


//findById will find a book by the specific id 

const findById = function(id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

//addBookmark will add the bookmark to the store(bookmarks)

const addBookmark = function (bookmark) {
  this.store.bookmarks.push(bookmark);
};

//findAndDelete will delete a bookmark from the local store

const findAndDelete = function(id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

//findAndUpdate will change a bookmark currently in the local store

const findAndExpand = function(id) {
  let currentBookmark = this.findById(id);
  currentBookmark.expanded = !currentBookmark.expanded;
};


const filterBookmarkList = function() {

};


//setError updates the error in the local store showing 
//what has been sent to the api error function

const setError = function (error) {
  this.error = error;
};


export default {
  store,
  findById,
  addBookmark,
  findAndDelete,
  findAndExpand,
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