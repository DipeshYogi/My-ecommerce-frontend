import { FILTER_SHOPS, GET_SIMILARITY_SCORE } from './types.js'

export const applyShopFilters = (freeDelivery, isVerified) =>{
    return{
        type: FILTER_SHOPS,
        payload: {freeDelivery, isVerified}

    }
}

export const getSimilarityScores = (val) =>{
    return{
        type: GET_SIMILARITY_SCORE,
        payload: val
    }
}