import * as model from './model'
import recipeView from './views/recipeView';


const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  }); 
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const renderSpinner =  function(parentEl){
  const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>  
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup)
}


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
    await model.loadSearchResults('pizza')
    console.log(model.state.search.results);

  } catch (err){
    console.log(err);
  }
}
controlSearchResults();

const init = function(){
  recipeView.addHandlerRender(controlRecipes)
}
init();
