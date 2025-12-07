import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function BrandFormModal({ onClose, title, onSave, Edit, brands }) {
  // react hook form component to handle and update the data and validations. 
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

   // receives the add or update method from the page as onSave props. works with the handle submit method of react hook form when the form is submitted.
  const saveBrand = (data) => {
    onSave(data);
  };

   // if data is edited receive the data and perform the reset function of the react hook form to update the data
  useEffect(() => {
    if (Edit) {
      reset(Edit);
    }
  }, [Edit]);

  // a single modal for both the add and update 
  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog" role="document">
        <form onSubmit={handleSubmit(saveBrand)} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                name="name"
                {...register("name", {
                  required: "name is required",
                  validate: (value) =>
                    !brands.some(
                      (brand) => brand.name.toLowerCase() === value.toLowerCase()
                    ) || "Name already exists",
                })}
              />
              {errors.name && (
                <p className="text-danger small">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BrandFormModal;
