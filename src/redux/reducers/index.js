export default {

    keyValue(state = '', action) {
        switch (action.type) {
            case 'KEYBOARD':
                return action.str;
            default:
                return state;
        }
    }
}