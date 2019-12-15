
//this module focuses specifically on the api requests
//talking to the server(aka fetch calls)



const BASE_URL = 'https://thinkful-list-api.herokuapp.com/scott/bookmarks';


function getBookmarks() {
  return fetch(BASE_URL);
}

const createBookmark = function(body) {
  // const newBookmark = JSON.stringify({title, url, description, rating });
    
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  });
};



const updateBookmark = function (id, updateData) {
  const newData = JSON.stringify(updateData);
  return fetch(`${BASE_URL}/${id}`, {
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
