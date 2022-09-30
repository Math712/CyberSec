import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import MaterialTable from 'material-table';
import modeleService from '../../services/modele/modeleService';
import './Modele.scss';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import * as ingredientService from '../../services/ingredient/ingredientService';
import CSS from 'csstype';

const selectStyle: CSS.Properties = {
  width: "15em"
}

const Modele = () => {

  const [modeles, setModeles]: any = useState([]);
  const [currentIngredient, setCurrentIngredient]: any = useState("");
  const [ingredients, setIngredients]: any = useState([]);
  const [iserror, setIserror]: any = useState(false);
  const [errorMessages, setErrorMessages]: any = useState([]);
  const [open, setOpen] = useState(false);

  var currentModeleIndex = 0

  const handleClickOpen:any = (clickedModele: any) => {
    modeles.map((modele:any, index:any) => {
      modele._id === clickedModele._id ? currentModeleIndex = index : void 0;
    })
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    var refreshEntries = () => {
      modeleService.getModeles().then((res)=>{
        setModeles(res.modeles)
      });
      ingredientService.getIngredients().then((res)=>{
        setIngredients(res.ingredients)
        ingredients.length > 0 ? setCurrentIngredient(...ingredients[0]) : setCurrentIngredient({}) ;
      });
    }
  
    refreshEntries();
  }, [])

  const menuItems = ingredients.map((ingredient: any) => (
    <MenuItem key={ingredient._id} value={ingredient._id} style={selectStyle}><em>{ingredient.nom}</em></MenuItem>
  ));

  const handleRowUpdate = (newData: any, oldData: any, resolve: any) => {
    let errorList: any = []
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

    if (errorList.length < 1) {
      modeleService.updateModele(newData).then(response => {
        const updateModeles = [...modeles];
        var searchIndex = 0;
        updateModeles.map((modele, index) => {
          modele._id === oldData._id ? searchIndex = index : void 0;
        })
        updateModeles[searchIndex] = newData;
        setModeles([...updateModeles]);
        resolve();
      }).catch(error => {
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          })
          resolve();
        })
      } else {
        toast.error("Erreur serveur", {
          position: toast.POSITION.BOTTOM_RIGHT
        })
        resolve();

      }
  }

  const handleUpdateIngredient: any = (e: any) => {
    const newIngredient = ingredients.filter((ingredient:any) => {
      return ingredient._id === e.target.value
    })[0]
    const newModele = modeles[currentModeleIndex];
    
    if (e.target.value !== "") {
      newModele["ingredients"] = [newIngredient];
    } else {
      newModele["ingredients"] = [];
    }

    modeleService.updateModele(newModele).then(response => {
      const updateModele = [...modeles];
      updateModele[currentModeleIndex] = newModele;
      setModeles([...updateModele]);
      setCurrentIngredient(newIngredient)
    }).catch(error => {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      })
  }

  const handleRowDelete = (oldData: any, resolve: any) => {
    modeleService.deleteModele(oldData).then(response => {
      const dataDelete = [...modeles];
      var searchIndex = 0;
      dataDelete.map((modele, index) => {
        modele._id === oldData._id ? searchIndex = index : void 0;
      })
      dataDelete.splice(searchIndex, 1);
      setModeles([...dataDelete]);
      resolve()
    }).catch(error => {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
      resolve();
    })
  }

  const handleRowAdd = (newData: any, resolve: any) => {

    let errorList: any = []
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

    if (errorList.length < 1) {
      modeleService.addModele(newData).then(response => {
        let newModeleData = [...modeles];
        newData["_id"] = response.data_created.modele._id
        newModeleData.push(newData);
        setModeles(newModeleData);
        resolve();
      }).catch(error => {
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          })
          resolve();
        })
      } else {
        toast.error("Erreur serveur", {
          position: toast.POSITION.BOTTOM_RIGHT
        })
        resolve();
      }
  }

  let columns: any = [
    { title: 'Nom', field: 'nom' },
    { title: 'Description', field: 'description' },
    { title: 'pUHT', field: 'pUHT' },
    { title: 'Gamme', field: 'gamme' },
    { title: 'Ingrédients', field: 'ingredients', editable: 'never', render: (rowData: any) => <Button variant="outlined" onClick={() => {handleClickOpen(rowData);setOpen(true)}}> Modifier </Button> },
    { title: 'Grammage', field: 'grammage' },
  ]


  return (
    <>
    <div className="col mx-3 my-auto">
        <MaterialTable
          title="Modèles"
          columns={columns}
          data={modeles}
          options={{
            headerStyle: { borderBottomColor: '#0275d8', borderBottomWidth: '3px' },
            actionsColumnIndex: -1
          }}
          editable={{
            onRowUpdate: (newData, oldData: any) =>
              new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve);

              }),
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                handleRowAdd(newData, resolve)
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                handleRowDelete(oldData, resolve)
              }),
          }}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
          <FormControl>
          <InputLabel id="select-autowidth-label">Ingrédient</InputLabel>
          <Select 
            labelId="select-autowidth-label"
            id="select-autowidth"
            value={currentIngredient?._id ?? ""}
            onChange={handleUpdateIngredient}
            autoWidth
            defaultValue={currentIngredient?._id ?? ""}
            label="Ingrédient"
            style={selectStyle}
          >
            <MenuItem value="">
              <em>Aucun</em>
            </MenuItem>
            {
              menuItems
            }
          </Select>
          </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Fermer</Button>
          </DialogActions>
        </Dialog>
    </div>
    </>
  );
}

export default Modele