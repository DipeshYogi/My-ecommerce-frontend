import { STARTING, SUCCESS, FAILURE } from '../actions/types';

const reducerHelper = {
  handleRequestData: (action) =>{
    let resultData, resultError, emptyData=[], isLoading=false;

    switch(action.status) {
      case STARTING:
        resultData = emptyData;
        resultError = "";
        isLoading = true
        break;
      case SUCCESS:
        if(action.response !== undefined && action.response !== null) {
          if (Array.isArray(action.response)){
            resultData = action.response.length > 0 ? Array.from(action.response) : emptyData;
          }else{
            resultData = action.response;
          }          
        }else{
          resultData = emptyData;
        }
        break;
      case FAILURE:
        resultData = emptyData;
        resultError = action.response;
        isLoading = false
        break;
      default:
        resultData = emptyData;
        resultError = "Something went wrong";
        isLoading = false
        break;
    }
    return{
      data: resultData,
      error: resultError,
      isLoading: isLoading,
      status: action.status
    }
  }
}

export default reducerHelper;