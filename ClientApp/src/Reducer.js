import authService from './components/api-authorization/AuthorizeService'

const initialState = {
    user: {
        
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DATA':
            return {
                ...state, user: action.data
            }
            break;
        case 'UPDATE_DATA':           
            const temp = { ...state.user, ...action.data }
            return {
                ...state, user: temp
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;