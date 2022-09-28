import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import MaterialTable from 'material-table';
import modeleService from '../../services/modele/modeleService';
import './Modele.scss';

const Modele = () => {

  const [modeles, setModeles]: any = useState([]);
  const [iserror, setIserror]: any = useState(false);
  const [errorMessages, setErrorMessages]: any = useState([]);

  let columns = [
    { title: 'Nom', field: 'nom' },
    { title: 'Description', field: 'description' },
    { title: 'pUHT', field: 'pUHT' },
    { title: 'Gamme', field: 'gamme' },
    { title: 'Ingrédients', field: 'ingredients' },
    { title: 'Grammage', field: 'grammage' },
  ]


  useEffect(() => {
    var refreshEntries = () => {
      modeleService.getModeles().then((res)=>{
        setModeles(res.modeles)
      });
    }
  
    refreshEntries();
  }, [])

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
        updateModeles.filter((modele, index) => {
          return modele._id === oldData._id ? searchIndex = index : void 0;
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

  const handleRowDelete = (oldData: any, resolve: any) => {
    modeleService.deleteModele(oldData).then(response => {
      const dataDelete = [...modeles];
      const index = oldData._id;
      dataDelete.splice(index, 1);
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


  return (
    <>
    <div className="row m-auto">
      <div className="col md-4">
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
      </div>
    </div>
    </>
  );
}

export default Modele