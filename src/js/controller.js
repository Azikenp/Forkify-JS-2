import * as model from './model'
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';


// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   }); 
// };


// ///////////////////////////////////////


// const renderSpinner =  function(parentEl){
//   const markup = `
//   <div class="spinner">
//     <svg>
//       <use href="${icons}#icon-loader"></use>
//     </svg>
//   </div>  
//   `;
//   parentEl.innerHTML = '';
//   parentEl.insertAdjacentHTML('afterbegin', markup)
// }

// if (module.hot){
//   module.hot.accept();
// }

const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) results view to mark selected serach results
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
    
    // 2) Loading recipe
    await model.loadRecipe(id);
    
    // 3) Rendering Recipe
    recipeView.render(model.state.recipe);


  } catch(err){
    console.log(err)
    recipeView.renderError();
  }
}


const controlSearchResults = async function(){
  try{
    resultsView.renderSpinner();
    //1) get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2) Load search query
    await model.loadSearchResults(query)

    //3) render results
    resultsView.render(model.getSearchResultsPage());

    //$) Render initial pagination buttons
    paginationView.render(model.state.search);

  } catch (err){
    console.log(err);
  }
}

const controlPagination = function(goToPage) {
  console.log(goToPage)
  //3) render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //$) Render NEW pagination buttons
  paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  // Update recipe servings (in the state)
  model.updateServings(newServings);

  // Update the view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {
  //Add or remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //update recipe view
  recipeView.update(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = function(newRecipe){
  console.log(newRecipe);

  //upload new recipe data
}


const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe)
  // controlServings();
}
init();
