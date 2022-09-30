import React, { useEffect, useState } from "react";
import { addIngredients, deleteIngredients, getIngredients, updateIngredients } from "../../services/ingredient/ingredientService";
import MaterialTable from 'material-table';
import { toast } from "react-toastify";

let columns = [
    { title: 'Nom', field: 'nom' },
    { title: 'Description', field: 'description' },
];

export const Ingredient = () => {
    const [ingredients, setIngredients] = useState([] as Record<string, any>[]);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([] as string[]);

    useEffect(() => {
        getIngredients().then(res => {
            let ingredientsRes = res.ingredients.map((ingredient: any)  => {
                const {_id: id, ...rest} = ingredient
                return {id: id, ...rest}
            });
            setIngredients(ingredientsRes);
        })
    }, []);



    const checkIfAFieldIsEmpty = (newData: any) => {
        let errorList = []
        if (newData.nom === "") {
            errorList.push("Rééssayez")
        }
        if (newData.description === "") {
            errorList.push("Rééssayez")
        }
        if (newData.puht === "") {
            errorList.push("Rééssayez")
        }
        if (newData.gamme === "") {
            errorList.push("Rééssayez")
        }
        if (newData.ingredients === "") {
            errorList.push("Rééssayez")
        }
        if (newData.grammage === "") {
            errorList.push("Rééssayez")
        }
        if( errorList.length > 1 ) {
            setErrorMessages(errorList);
            setIsError(true);
        }
        return errorList.length > 1
    }

    const handleRowUpdate = async (newData: any, oldData: any) => {
        const isEmptyField = checkIfAFieldIsEmpty(newData);
        if(!isEmptyField){
            updateIngredients(newData).then(res => {
                const updateIngredients = [...ingredients];
                let searchIndex = 0;
                updateIngredients.map((ingredient: any, index) => 
                    searchIndex = ingredient._id === oldData._id ? index : 0
                );
                updateIngredients[searchIndex] = newData;
                setIngredients([...updateIngredients]);
                setIsError(false);
                setErrorMessages([]);
            }).catch(error => {
                toast.error(error.message, {
                  position: toast.POSITION.BOTTOM_RIGHT
                })
              })
            } else {
              toast.error("Erreur serveur", {
                position: toast.POSITION.BOTTOM_RIGHT
              })
      
            }
    }

    const handleRowAdd = async (newData: any) => {
        const isEmptyField = checkIfAFieldIsEmpty(newData);
        if(!isEmptyField) {
            addIngredients(newData).then(res => {
                let newIngredients = [...ingredients];
                newData["_id"] = res.data_created._id
                newIngredients.push(newData);
                setIngredients(newIngredients);
                setErrorMessages([]);
                setIsError(false);
            }).catch(error => {
                toast.error(error.message, {
                  position: toast.POSITION.BOTTOM_RIGHT
                })
              })
            } else {
              toast.error("Erreur serveur", {
                position: toast.POSITION.BOTTOM_RIGHT
              })
            }
    }

    const handleRowDelete = async (oldData: any) => {
        deleteIngredients(oldData).then(res => {
            const dataDelete = [...ingredients];
            var searchIndex = 0;
            dataDelete.map((ingedient, index) => {
                ingedient._id === oldData._id ? searchIndex = index : void 0;
            })
            dataDelete.splice(searchIndex, 1);
            setIngredients([...dataDelete]);
            
        }).catch(error => {
            toast.error(error.message, {
              position: toast.POSITION.BOTTOM_RIGHT
            })
          })
    }
    
    return (
        <>
            <div className="col mx-3 my-auto">
                    <MaterialTable
                        title="Ingrédients"
                        columns={columns}
                        data={ingredients}
                        options={{
                            headerStyle: { borderBottomColor: '#0275d8', borderBottomWidth: '3px' },
                            actionsColumnIndex: -1
                        }}
                        editable={{
                            onRowUpdate: handleRowUpdate,
                            onRowAdd: handleRowAdd,
                            onRowDelete: handleRowDelete
                        }}
                    />
            </div>
        </>
    );
}

