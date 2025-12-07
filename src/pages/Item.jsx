import React, { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar.jsx";
import { Link } from "react-router-dom";
import Table from "../components/Table.jsx";
import TableActions from "../helpers/actions.jsx";
import ItemFormModal from "../components/ItemFormModal.jsx";
import { Prev } from "react-bootstrap/esm/PageItem.js";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function Item() { 
  // declaring states for displaying data of items, brands and models in the table, editing the Item and modal opening and closing.
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
  // get all the models from models.json
    const fetchModels = async () => {
    const res = await fetch("/data/models.json")
      .then((res) => res.json())
      .then((result) => {
        setModels(result);
      })
      .catch((err) => {
        console.log("models error", err);
      });
  };
  // from brands get the name of brand through brandId
  const getBrandName=(brandId)=>{
    const filterBrand = brands.find(brand=> brand.id == brandId)
    
    if(filterBrand){
      return filterBrand.name
    }
    return "no brand";
  } 
  // from the models, get the name of model through modelId
    const getModelName=(modelId)=>{
    const filterModel = models.find(model=> model.id == modelId)
    
    if(filterModel){
      return filterModel.name
    }
    return "no Model";
  } 
  // save the record when adding the new item
  const handleSaveItem = (data) => {
    const newItem = {
      id: items.length + 1,
      name: data.name,
      amount: data.amount,
      brandId: data.brandId,
      modelId: data.modelId,
      dateAdded: new Date().toISOString().slice(0, 10),
    };

    setItems([...items, newItem]);
    setShowModal(false);
    toast.success("item added successfuly");
  };
  // save the record when updating the existing item
  const handleUpdateItem = (data) => {
    // map over items and replace the one being edited
    const updatedItems = items.map((item) =>
      item.id === itemToEdit.id ? { ...item, ...data } : item
    );
    setItems(updatedItems); // update the table
    setShowModal(false); // close modal
    toast.success("Item updated successfully");
  };
 // display the fetched data of items brands and models
  useEffect(() => {
    fetchItems();
    fetchBrands();
    fetchModels();
  }, []);
  // popover the edit modal and add data of the selected row
  const handleEdit = (row) => {
    setItemToEdit(row);
    setShowModal(true);
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
          setItems((prev) => prev.filter((item) => item.id != id));
          Swal.fire("Success!", "item deleted successfuly.", "success");
        }
      })
      .catch(() => {
        Swal.fire("Error!", "Could not delete item.", "error");
      });
  };
 // defines the columns and data to show in the data-table.  send the onEdit and onDelete props and row to the TableActions component
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Brand", selector: (row) => getBrandName(row.brandId), sortable: true },
    { name: "Model", selector: (row) => getModelName(row.modelId), sortable: true },
    { name: "Date Added", selector: (row) => row.dateAdded, sortable: true },
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

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Items</h4>
          <button
            onClick={() => {
              setItemToEdit(null); 
              setShowModal(true);
            }}
            className=" btn btn-primary"
          >
            Add new Item
          </button> 
        </div>
        {showModal && (
          <ItemFormModal
            Edit={itemToEdit}
            title={itemToEdit ? "Edit Item" : "Add item"}
            onClose={() => setShowModal(false)}
            brands={brands}
            models={models}
            items={items}
            onSave={itemToEdit ? handleUpdateItem : handleSaveItem}
          />
        )}
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="card shadow p-4">
            <div className="card-body">
              <Table columns={columns} data={items}></Table> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
