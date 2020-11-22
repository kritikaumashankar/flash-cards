import axios from 'axios';

const GET_ALL_QA = "GET_ALL_QA"
// const GET_RANDOM_QA = "GET_RANDOM_QA"
 const ADD_QA = "ADD_QA"
 const EDIT_QA = "EDIT_QA"
 const DELETE_QA = "DELETE_QA"

export const getAllQA = () =>{
  return (dispatch) => {
    axios.get("/api/flashcards")
    .then(res => dispatch({ type: GET_ALL_QA, flashcards: res.data }) 
    )
    .catch((error)=> {
      console.log(error);
    });
  };
};

export const getQA = () =>{
  return (dispatch) => {
    axios.get("/api/flashcard")
    .then(res => dispatch({ type: GET_ALL_QA, flashcards: res.data }) 
    )
    .catch((error)=> {
      console.log(error);
    });
  };
};

export const addQA = (flashcard) => {
  return (dispatch) => {
    axios.post('/api/flashcards',flashcard )
      .then( res => dispatch({ type: ADD_QA, flashcard:res.data }) 
    )
  };
};

export const editQA = (flashcard) => {
  return (dispatch) => {    
    axios.put(`/api/flashcards/${flashcard._id}`,  flashcard )
      .then( res => {
        dispatch({ type: EDIT_QA, flashcard: JSON.stringify(res.data) }) 
      }
    )
  };
};

export const deleteQA =(flashcard)=>{
  return(dispatch) =>{
    axios.delete(`/api/flashcards/${flashcard._id}`)
    .then(res =>(dispatch({ type: DELETE_QA, _id:res.data }) ))
  }
}
export default (state = [], action ) => {
  switch(action.type) {
    case GET_ALL_QA:
      return action.flashcards
    case ADD_QA:
      return [action.flashcard, ...state]
    case EDIT_QA:
      return state.map( fc => {
        if (fc._id=== JSON.parse(action.flashcard)._id){
          fc.question = JSON.parse(action.flashcard).question
          fc.answer = JSON.parse(action.flashcard).answer
          return fc
        }
         return fc
      })
    case DELETE_QA:
      console.log(action._id)
      return state.filter( fc => fc._id !== action["_id"] )
    default:
      return state;
  };
};
