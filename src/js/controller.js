import * as model from './model'
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';


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

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering Recipe
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
    resultsView.render(model.getSearchResultsPage(1));

    //$) Render initial pagination buttons
    paginationView.render(model.state.search);

  } catch (err){
    console.log(err);
  }
}
controlSearchResults();

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();
