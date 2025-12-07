import React, { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar.jsx";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import TableActions from "../helpers/actions";
import Swal from "sweetalert2";
import ModelFormModal from "../components/ModelFormModal";
import { toast } from "react-toastify";

function Model() {
  // declaring states for displaying data of items, brands and models in the table, editing the Model and modal opening and closing.
  const [models, setModels] = useState([]);
  const [modelToEdit, setModelToEdit] = useState(null);
  const [brands, setBrands] = useState([]);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

   // get all the models from models.json
  const fetchModels = async () => {
    const res = await fetch("/data/models.json")
      .then((res) => res.json())
      .then((result) => {
        setModels(result);
      })
      .catch((err) => {
        console.log("Model Error", err);
      });
  };
   // get all the brands from brands.json
  const fetchBrands = async () => {
    const res = await fetch("/data/brands.json")
      .then((res) => res.json())
      .then((result) => {
        setBrands(result);
      })
      .catch((err) => {
        console.log("brands error", err);
      });
  };
    // get all the items from items.json
  const fetchItems = async () => {
    const res = await fetch("/data/items.json")
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      })
      .catch((err) => {
        console.log("Item Error", err);
      });
  }; 
     // from brands get the name of brand through brandId
  const getBrandName= (brandId)=>{
    const filterBrand = brands.find(brand=> brand.id == brandId)
    if(filterBrand){
      return filterBrand.name
    }
    return "no brand"
  }
     // from items get the count of items that have modelId similar to the modelId passed.
  const getItems = (modelId) => {
    const count = items.filter((item) => item.modelId == modelId).length;
    return count;
  };
    // save the record when adding the new model
  const handleSaveModel = (data) => {
    const newModel = {
      id: models.length + 1,
      name: data.name,

      brandId: data.brandId,
    };

    setModels([...models, newModel]);
    setShowModal(false);
    toast.success("Model added successfuly");
  };
  // popover the edit modal and add data of the selected row
  const handleEdit = (row) => {
    setModelToEdit(row);
    setShowModal(true);
  };
    // save the record when updating the existing model
  const handleUpdateModel = (data) => {
    const updatedModels = models.map((model) =>
      model.id === modelToEdit.id ? { ...model, ...data } : model
    );
    setModels(updatedModels);
    setShowModal(false);
    toast.success("Models updated successfully");
  };
   // delete the existing record on confirmation by a Swal popup.
  const handleDelete = (row) => {
    const id = row.id;
    Swal.fire({
      title: "Are you sure?",
      text: `Delete item: ${row.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          setModels((prev) => prev.filter((model) => model.id != id));
          Swal.fire("Success!", "item deleted successfuly.", "success");
        }
      })
      .catch(() => {
        Swal.fire("Error!", "Could not delete item.", "error");
      });
  };
   // defines the columns and data to show in the data-table. send the onEdit and onDelete props and row to the TableActions component
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Brands", selector: (row) => getBrandName(row.brandId), sortable: true },
    {
      name: "Items Count",
      selector: (row) => getItems(row.id),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <TableActions
          onEdit={() => handleEdit(row)}
          onDelete={() => handleDelete(row)}
        />
      ),
      ignoreRowClick: true,
      allowoverflow: true,
    },
  ];

    // display the fetched data of items brands and models
  useEffect(() => {
    fetchModels();
    fetchBrands();
    fetchItems();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Models</h4>
          <button
            onClick={() => {
              setModelToEdit(null); // important
              setShowModal(true);
            }}
            className=" btn btn-primary"
          >
            Add new Model
          </button>
        </div>
        {showModal && (
          <ModelFormModal
            Edit={modelToEdit}
            onClose={() => setShowModal(false)}
            title={modelToEdit ? "Edit Model" : "Add model"}
            brands={brands}
            models={models}
            onSave={modelToEdit ? handleUpdateModel : handleSaveModel}
          />
        )}
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="card shadow p-4">
            <div className="card-body">
              <Table columns={columns} data={models}></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Model;
