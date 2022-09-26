export const LOGIN = "LOGIN";
export const INFO_USER = "INFO_USER";
export const RESET_USER = "RESET_USER";

export const loggedIn = (isLogin: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: LOGIN,
            isLogin
        })
    }
}

export const userInfo = (user: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: INFO_USER,
            user
        })
    }
}

export const resetUserInfo = () => {
    return async (dispatch: any) => {
        dispatch({
            type: RESET_USER,
        })
    }
}