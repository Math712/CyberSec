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
                updateIngredients.filter((ingredient: any, index) => 
                    searchIndex = ingredient._id === oldData._id ? index : 0
                );
                updateIngredients[searchIndex] = newData;
                setIngredients([...updateIngredients]);
                setIsError(false);
                setErrorMessages([]);
            }). catch(e => {
                console.log(e)
                setErrorMessages(["Erreur serveur"]);
                setIsError(true)
            })
        }
    }

    const handleRowAdd = async (newData: any) => {
        const isEmptyField = checkIfAFieldIsEmpty(newData);
        if(!isEmptyField) {
            addIngredients(newData).then(res => {
                let newIngredients = [...ingredients];
                newIngredients.push(newData);
                setIngredients(newIngredients);
                setErrorMessages([]);
                setIsError(false);
            }).catch(e=> {
                setErrorMessages(["Erreur serveur"]);
                setIsError(true);
            })
        }
    }

    const handleRowDelete = async (oldData: any) => {
        deleteIngredients(oldData).then(res => {
            const dataDelete = [...ingredients];
            const index = oldData._id;
            dataDelete.splice(index, 1);
            setIngredients([...dataDelete]);
            
        }).catch(e => {
            setErrorMessages(["Erreur serveur"]);
            setIsError(true);
            
        });
    }
    
    return (
        <>
            <p>Ingredient</p>
            <div className="row m-auto">
                <div className="col md-4">
                    <MaterialTable
                        title="Ingrdients"
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

                    <div>
                        {isError && toast.error(errorMessages.map((msg, index) => {
                            return <div key={index}>{msg}</div>
                        }), {position: toast.POSITION.BOTTOM_RIGHT})}
                    </div>
                </div>
            </div>
        </>
    );
}

