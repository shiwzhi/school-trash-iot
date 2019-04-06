import { ADD_ARTICLE, SEARCH_BAR_TEXT_CHANGE } from "../constants/action-types";

export function addArticle(payload) {
    return { type: "ADD_ARTICLE", payload }
};

export function searchBarTextChange(payload) {
    return { type: "SEARCH_BAR_TEXT_CHANGE", payload }
};