const LOAD_USER = 'users/LOAD_USER'


export const loadUser = (user) => ({
    type: LOAD_USER,
    user
})


// THUNK

export const getUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`)

    if (response.ok) {
        const user = await response.json();
        dispatch(loadUser(user))
        return user
    }
}

// REDUCER

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_USER: {
            return {...state, [action.users.userId]: action.user }
        }
        default:
            return { ...state }
    }
}

export default userReducer;
