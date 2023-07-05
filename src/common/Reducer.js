import { combineReducers } from "@reduxjs/toolkit";

const initialState={
    user: {},
    productPageFilters: {
        search: '',
        sortBy: 'Default',
        category: 'ALL'
    },
    popups: {
        orderPlaced: false,
        productDeleted: '',
        productModified: '',
        productAdded: ''
    }
};
const UserReducer = (state = initialState.user, action) => {
    switch(action.type) {
        case 'login':
            sessionStorage.setItem('currentUser', JSON.stringify(action.payload));
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(action.payload)
            };
            const login = async (callback) => {
                console.log('enterting log in');
                try {
                    const response = await fetch('http://localhost:8080/api/auth/signin', requestOptions);
                    const jsonData = await response.json();
                    console.log(jsonData);
                    callback(jsonData);
                } catch (error) {
                    console.log('Error fetching data:', error);
                }
            };
            login();
            return action.payload;
        case 'logout':
            sessionStorage.removeItem('currentUser');
            return {};
        default:
            return state;
    }
}

const productPageFiltersReducer = (state = initialState.productPageFilters, action) => {
    switch(action.type) {
        case 'setSearch':
            return {...state, search: action.payload};
        case 'setCategory':
            return {...state, category: action.payload};
        case 'setSortBy':
            return {...state, sortBy: action.payload};
        default:
            return state;
    }
}

const popupsReducer = (state = initialState.popups, action) => {
    switch(action.type) {
        case 'setOrderPlacedTrue':
            return {...state, orderPlaced: true};
        case 'setorderPlacedFalse':
            return {...state, orderPlaced: false};
        case 'setProductDeleted':
            return {...state, productDeleted: action.payload};
        case 'setProductModified':
            return {...state, productModified: action.payload};
        case 'setProductAdded':
            return {...state, productAdded: action.payload};
        default:
            return state;
    }
}

const AppReducer = combineReducers({
    user: UserReducer,
    productPageFilters: productPageFiltersReducer,
    popups: popupsReducer
  });
    
  export default AppReducer;
