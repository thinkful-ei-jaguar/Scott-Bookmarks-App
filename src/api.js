
//this module focuses specifically on the api requests
//talking to the server(aka fetch calls)



const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jtscott';


function getBookmarks() {
  return fetch(`${BASE_URL}/bookmarks`);
}

function createBookmark(bookmark) {
  const newBookmark = JSON.stringify( bookmark );
  console.log(newBookmark);
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newBookmark
  });
}


const updateBookmark = function (id, updateData) {
  const newData = JSON.stringify(updateData);
  return fetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newData
  });
};


function deleteBookmark(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
}
    



export default {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
};
