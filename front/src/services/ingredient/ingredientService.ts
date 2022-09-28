import { axiosConfig } from "../axios/axiosConfig";

const API_URL = "/ingredient";

const getIngredients = async () => {
    return axiosConfig.get(API_URL + '/').then(res => res.data);
}

const addIngredients = async (payload: any) => {
    return axiosConfig.post(API_URL + '/add', {...payload}).then(res => res.data);
}

const updateIngredients = async (payload: any) => {
    return axiosConfig.patch(API_URL+ '/update', {...payload}).then(res => res.data)
}

const deleteIngredients = async (payload: any) => {
    return axiosConfig.delete(API_URL + '/delete', {data: {id: payload.id}}).then(res => res.data);
}

export {getIngredients, addIngredients, updateIngredients, deleteIngredients};