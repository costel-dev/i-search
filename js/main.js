import { clearPushListener, clearSearchText, setSearchFocus, showClearTextButton } from './searchBar.js';
import { deleteSearchResults, buildSearchResults, clearStatsLine, setStatsLine } from "./searchResults.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";

document.addEventListener('readystatechange', (event) => {
    if(event.target.readyState === 'complete') {
        initApp();
    }
});

const initApp = () => {
    // set the focus on the text input
    setSearchFocus();
    // show the delete button after you type in
    const search = document.getElementById('search');
    search.addEventListener('input', showClearTextButton);
    // clear the search field
    const clear = document.getElementById('clear');
    clear.addEventListener('click', clearSearchText);

    clear.addEventListener('keydown', clearPushListener);

    const form = document.getElementById('searchBar');
    form.addEventListener('submit', submitTheSearch);
}

// 
const submitTheSearch = (e) => {
    e.preventDefault();
    // delete search results
    deleteSearchResults();
    // process the search
    processTheSearch();
    // set the focus
    setSearchFocus();
}

const processTheSearch = async () => {
    // clear the stats line
    clearStatsLine();
    const searchTerm = getSearchTerm();
    if(searchTrem === '') return;
    const resultArray = await retrieveSearchResults(searchTerm);
    if(resultArray.length) buildSearchResults(resultArray);
    setStatsLine(resultArray.length);
}