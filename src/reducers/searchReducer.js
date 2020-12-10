import {GET_SIMILARITY_SCORE} from '../actions/types';
var stringSimilarity = require('string-similarity');


const initialState = {
  itemList: ["Nescafe Coffee", "Tomato", "Zomato", "Maggi", "Tata salt", "Desi Salt", 
              "Savlon sanitizer", "Dettol sanitizer", "Axe signature", "Axe perfume",
              "Amul milk", "Amul cheese", "Cabbage", "Lays", "Potato", "Tulsi drops"],
  finalScores: [],
}

const SearchReducer = (state=initialState, action) =>{
  switch(action.type){
    case GET_SIMILARITY_SCORE:
      var scoring = []
      for(var i=0; i<state.itemList.length; i++){
        var score = stringSimilarity.compareTwoStrings(action.payload.toLowerCase(), state.itemList[i].toLowerCase());
        scoring.push({id:i, text:state.itemList[i], sc:score})
      }
      return{
        ...state,
        finalScores: scoring.filter(txt => txt.sc > 0 ).sort((a, b) => (b.sc - a.sc))
      }
    
    default:
      return state
  }
}

export default SearchReducer;