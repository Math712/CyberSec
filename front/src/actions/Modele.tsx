export const NOM = "NOM";
export const DESCRIPTION = "DESCRIPTION";
export const PUHT = "PUHT";
export const GAMME = "GAMME";
export const INGREDIENTS = "INGREDIENTS";
export const GRAMMAGE = "GRAMMAGE";
export const ISERROR = "ISERROR";

export const setNom = (nom: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: NOM,
            nom
        })
    }
}

export const setDescription = (description: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: DESCRIPTION,
            description
        })
    }
}

export const setPUHT = (puht: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: PUHT,
            puht
        })
    }
}

export const setGamme = (gamme: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: GAMME,
            gamme
        })
    }
}

export const setIngredients = (ingredients: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: INGREDIENTS,
            ingredients
        })
    }
}

export const setGrammage = (grammage: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: GRAMMAGE,
            grammage
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