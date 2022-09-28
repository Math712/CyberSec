import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import MaterialTable from 'material-table';
import procedeService from '../../services/procede/procedeService';
import './Procede.scss';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import modeleService from '../../services/modele/modeleService';
import CSS from 'csstype';


const selectStyle:CSS.Properties = {
  width: "15em"
}

const Procede = () => {

  const [procedes, setProcedes]: any = useState([]);
  const [modeles, setModeles]: any = useState([]);
  const [currentModele, setCurrentModele]: any = useState("");
  const [iserror, setIserror]: any = useState(false);
  const [errorMessages, setErrorMessages]: any = useState([]);
  const [open, setOpen] = useState(false);

  var currentProcedeIndex = 0

  const handleClickOpen:any = (clickedProcede: any) => {
    procedes.map((procede:any, index:any) => {
      return procede._id === clickedProcede._id ? currentProcedeIndex = index : void 0;
    })[0]
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    var refreshEntries = () => {
      procedeService.getProcedes().then((res)=>{
        setProcedes(res.procedes)
      });
      modeleService.getModeles().then((res)=>{
        setModeles(res.modeles)
        modeles.length > 0 ? setCurrentModele(...modeles[0]) : setCurrentModele({}) ;
      });
    }
  
    refreshEntries();
  }, [])

  const menuItems = modeles.map((modele: any) => (
    <MenuItem key={modele._id} value={modele._id} style={selectStyle}><em>{modele.nom}</em></MenuItem>
  ));

  const handleRowUpdate = (newData: any, oldData: any, resolve: any) => {
    let errorList: any = []
    if (newData.nom === "") {
      errorList.push("Rééssayez")
    }
    if (newData.description === "") {
      errorList.push("Rééssayez")
    }
    if (newData.modeles === null) {
      errorList.push("Rééssayez")
    }
    if (newData.etapes === "") {
      errorList.push("Rééssayez")
    }

    if (errorList.length < 1) {
      procedeService.updateProcede(newData).then(response => {
        const updateProcede = [...procedes];
        var searchIndex = 0;
        updateProcede.filter((procede, index) => {
          return procede._id === oldData._id ? searchIndex = index : void 0;
        })
        updateProcede[searchIndex] = newData;
        setProcedes([...updateProcede]);
        resolve()
        setIserror(false)
        setErrorMessages([])
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

  const handleUpdateModele: any = (e: any) => {
    const newModele = modeles.filter((modele:any) => {
      return modele._id === e.target.value
    })[0]
    const newProcede = procedes[currentProcedeIndex];
    newProcede["modeles"] = [newModele];

    procedeService.updateProcede(newProcede).then(response => {
      const updateProcede = [...procedes];
      updateProcede[currentProcedeIndex] = newProcede;
      setProcedes([...updateProcede]);
      setCurrentModele(newModele)
    }).catch(error => {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      })
  }

  const handleRowDelete = (oldData: any, resolve: any) => {
    procedeService.deleteProcede(oldData).then(response => {
      const dataDelete = [...procedes];
      const index = oldData._id;
      dataDelete.splice(index, 1);
      setProcedes([...dataDelete]);
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
    if (newData.modeles === null) {
      errorList.push("Rééssayez")
    }
    if (newData.etapes === "") {
      errorList.push("Rééssayez")
    }

    if (errorList.length < 1) {
      procedeService.addProcede(newData).then(response => {
        let newProcedeData = [...procedes];
        newProcedeData.push(newData);
        setProcedes(newProcedeData);
        resolve()
        setErrorMessages([])
        setIserror(false)
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

  let columns:any = [
    { title: 'Nom', field: 'nom' },
    { title: 'Description', field: 'description' },
    { title: 'Modèle', field: 'modeles', editable: 'never', render: (rowData: any) => <Button variant="outlined" onClick={() => {handleClickOpen(rowData);setOpen(true)}}> Voir </Button> },
    { title: 'Étapes', field: 'etapes' }
  ]

  return (
    <>
    <div className="row m-auto">
      <div className="col md-4">
        <MaterialTable
          title="Procédés"
          columns={columns}
          data={procedes}
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
          <InputLabel id="select-autowidth-label">Modèle</InputLabel>
          <Select 
            labelId="select-autowidth-label"
            id="select-autowidth"
            value={currentModele._id ?? ""}
            onChange={handleUpdateModele}
            autoWidth
            defaultValue={currentModele._id ?? ""}
            label="Modèle"
            style={selectStyle}
          >
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

        {iserror &&
          toast.error(errorMessages[0], {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        }
      </div>
    </div>
    </>
  );
}

export default Procede