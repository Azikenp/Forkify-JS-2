

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
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();


    // 1) Loading recipe
    await model.loadRecipe(id);
    
    

    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);

    



  } catch(err){
    alert (err)
    console.log(err)
  }
}




// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
const windowObj = ['hashchange', 'load'];
windowObj.forEach(ev => window.addEventListener(ev, controlRecipes))