import { Typography } from "../../utils";

const initialState = {
    increment: 0
}
export default contacts = (state = initialState, action) => {
    switch (action.type) {
        case Typography.REWARD_INCREMENT_CHECK:
            return {
                ...state,
                increment: action.payload
            }
        default:
            return state;
    }
}
