import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import MaterialTable from 'material-table';
import procedeService from '../../services/procede/procedeService';
import './Procede.scss';

const Procede = () => {

  const [procedes, setProcedes]: any = useState([]);
  const [iserror, setIserror]: any = useState(false);
  const [errorMessages, setErrorMessages]: any = useState([]);

  let columns = [
    { title: 'Nom', field: 'nom' },
    { title: 'Description', field: 'description' },
    { title: 'Modeles', field: 'modeles' },
    { title: 'Etapes', field: 'etapes' }
  ]


  useEffect(() => {
    var refreshEntries = () => {
      procedeService.getProcedes().then((res)=>{
        setProcedes(res.procedes)
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
    if (newData.modeles === "") {
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
    if (newData.modeles === "") {
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


  return (
    <>
    <div className="row m-auto">
      <div className="col md-4">
        <MaterialTable
          title="Procédé"
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