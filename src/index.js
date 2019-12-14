import $ from 'jquery';

import './index.css';
import bookmark from './bookmark'


function renderHomePage() {
  const html = `
    <button class="add-bookmark">
    Add Bookmark
   </button>
     <select name="ratings" id="filter-button">
         <option value="">Filter By Rating</option>
         <option value="five-star">5 Stars</option>
         <option value="four-star">4 Stars</option>
         <option value="three-star">3 Stars</option>
         <option value="two-star">2 Stars</option>
         <option value="one-star">1 Star</option>
       </select>
     <ul>
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
  
     </ul>
   </body>
      `;
  
  $('.main').html(html); //accessing the main from index.html and inputing the html variable we just created
}

function addFormTemplate() {
  const html = `
    <section id='js-add-new-bookmark' class='hidden' role="region">
    <form>
      <h2 class='form-title'>What would you like to bookmark?</h2>
      <section class='form-right' role="region">
        <div class='user-input'>
          <label for="title">Title: </label>
          <input type="text" name="title" id="js-title-input" required>
        </div>
        <div class='user-input'>
          <label for="url">URL: </label>
          <input type="url" name="url" id="js-url-input" placeholder="http://example.com" value="http://" required>
        </div>
        <div class='user-input'>
          <label for="description">Description: </label>
          <input type="text" name="description" id="js-description-input" required>
        </div>
      </section>
      <div class='form-center'>
        <select name="rating-filter" id="js-rating-input" required>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
        <div id="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" id="js-add-cancel">Cancel</button>
        </div>
      </div>
    </form>
    `;
  $('.main').append(html);
}

const handleAddFormClicked = function() {
  $('.main').on('click', '.add-bookmark', function() {
    event.preventDefault();
    addFormTemplate();
  });
};
  



function renderBookmarkList(listItems) {

  const html = `
        <li>
        <span class="title">Bookmark 1</span>
        <button class="visit">visit</button>
        <span class="fa fa-trash" />
        </li>
    `;
  
  $('.bookmark-list').html(listItems); 
}

function makeListItems() {

}

  
function bookmarkHandler() {
  renderHomePage();
  addFormTemplate();
  renderBookmarkList();
  handleAddFormClicked();
}
  
$(bookmarkHandler);
  