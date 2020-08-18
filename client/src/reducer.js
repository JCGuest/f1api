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
        default: return state;

    };
};