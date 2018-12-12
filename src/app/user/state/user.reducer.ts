export function reducer(state, action) {
    switch (action.type) {

        case 'TOGGLE_USER_MASK':
        return {
            ...state,
            maskUserName: action.payload
        };

        default:
            return state;
    }
}
