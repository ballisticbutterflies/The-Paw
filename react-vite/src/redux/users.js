const LOAD_USER = 'users/LOAD_USER'


export const loadUser = (user) => (
    console.log("hitting action"),
    {
    type: LOAD_USER,
    user
})


// THUNK

export const getUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`)
    console.log("hitting thunk in users")

    if(!res.ok) {
        return res;
    } else if (res.ok) {
        const user = await res.json();
        dispatch(loadUser(user))
        return user;
    }
}

// REDUCER

const userReducer = (state = {}, action) => {

    switch (action.type) {
        case LOAD_USER: {
            console.log("hitting reducer")
            return {...state, [action.users.userId]: action.user }
            // const userState = {};
            // userState[user.id]
        }
        default:
            return { ...state }
    }
}

export default userReducer;
