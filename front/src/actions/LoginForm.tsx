export const USERNAME = "USERNAME";
export const PASSWORD = "PASSWORD";
export const ISBUTTONDISABLED = "ISBUTTONDISABLED";
export const HELPERTEXT = "HELPERTEXT";
export const ISERROR = "ISERROR";

export const setUsername = (username: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: USERNAME,
            username
        })
    }
}

export const setPassword = (password: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: PASSWORD,
            password
        })
    }
}

export const setIsButtonDisabled = (isButtonDisabled: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: ISBUTTONDISABLED,
            isButtonDisabled
        })
    }
}

export const setHelperText = (helperText: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: HELPERTEXT,
            helperText
        })
    }
}

export const setIsError = (isError: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: ISERROR,
            isError
        })
    }
}