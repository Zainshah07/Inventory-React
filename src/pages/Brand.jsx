import React, { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar.jsx";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Table from "../components/Table";
import TableActions from "../helpers/actions";
import BrandFormModal from "../components/BrandFormModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Brand() {
  // declaring states for displaying data of items, brands and models in the table, editing the Brand and modal opening and closing.
  const [brands, setBrands] = useState([]);
  const [items, setItems] = useState([]);
  const [models, setModels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);

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
   // from items get the count of items that have brandId similar to the brandId passed.
  const getItems = (brandId) => {
    const count = items.filter((item) => item.brandId == brandId).length;
    return count;
  };
   // from models get the count of models that have brandId similar to the brandId passed.
  const getModels = (brandId) => {
    const count = models.filter((model) => model.brandId == brandId).length;
    return count;
  };
  // save the record when adding the new brand
  const handleSaveBrand = (data) => {
    const newBrand = {
      id: brands.length + 1,
      name: data.name,
    };
    setBrands([...brands, newBrand]);
    setShowModal(false);
    toast.success("brand added successfuly");
  };
  // display the fetched data of items brands and models
  useEffect(() => {
    fetchBrands();
    fetchItems();
    fetchModels();
  }, []);
  // popover the edit modal and add data of the selected row
  const handleEdit = (row) => {
    setBrandToEdit(row);
    setShowModal(true);
  };
  // save the record when updating the existing brand
  const handleUpdateBrand = (data) => {
    const updatedBrands = brands.map((brand) =>
      brand.id === brandToEdit.id ? { ...brand, ...data } : brand
    );
    setBrands(updatedBrands);
    setShowModal(false);
    toast.success("Brand updated successfully");
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
          setBrands((prev) => prev.filter((brand) => brand.id != id));
          Swal.fire("Success!", "Brand deleted successfuly.", "success");
        }
      })
      .catch(() => {
        Swal.fire("Error!", "Could not delete brand", "error");
      });
  };
   // defines the columns and data to show in the data-table. send the onEdit and onDelete props and row to the TableActions component
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    {
      name: "Items Count",
      selector: (row) => getItems(row.id),
      sortable: true,
    },
    {
      name: "Models Count",
      selector: (row) => getModels(row.id),
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
  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Brands </h4>
          <button
            onClick={() => {
              setBrandToEdit(null);
              setShowModal(true);
            }}
            className=" btn btn-primary"
          >
            Add new Brand
          </button>
        </div>
        {showModal && (
          <BrandFormModal
            Edit={brandToEdit}
            brands={brands}
            title={brandToEdit ? "Edit Brand" : "Add Brand"}
            onClose={() => setShowModal(false)}
            onSave={brandToEdit ? handleUpdateBrand : handleSaveBrand}
          />
        )}
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="card shadow p-4">
            <div className="card-body">
              <Table columns={columns} data={brands}></Table>
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brand;
