import { ADD_ARTICLE, SEARCH_BAR_TEXT_CHANGE } from "../constants/action-types";
const initialState = {

};
function rootReducer(state = initialState, action) {
    if (action.type === SEARCH_BAR_TEXT_CHANGE) {
        return Object.assign({}, state, {
            searBarText: action.payload
        });
    }
    if (action.type === ADD_ARTICLE) {
        return Object.assign({}, state, {
            articles: state.articles.concat(action.payload)
        });
    }
    return state;
}
export default rootReducer;