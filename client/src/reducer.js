export default function reducer( state = { isLoggedIn: false, loading: false, user: {}}, action) {
    switch (action.type) {
        case "LOADING_STATUS":
            return {
                isLoggedIn: false,
                user: {},
                loading: true
            }
        case "LOG_IN":
            return {
                isLoggedIn: action.isLoggedIn,
                user: action.user,
                loading: false

        }
        case "LOG_OUT":
            return {
                isLoggedIn: action.isLoggedIn,
                user: action.user,
                loading: false
            }
        case "LOADING_ITEMS":
            return {
                ...state,
                loading: true
            }
        case "ADD_ITEMS":
            return {
                ...state,
                items: action.items,
                loading: action.loading
            }
        default: return state;

    }
}