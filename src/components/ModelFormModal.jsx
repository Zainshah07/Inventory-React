import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function ModelFormModal({ onClose, Edit, title, brands, onSave }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (Edit) {
      reset(Edit);
    }
  }, [Edit]);
  const saveModel = (data) => {
    onSave(data);
   
  };
  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog" role="document">
        <form onSubmit={handleSubmit(saveModel)} className="modal-content">
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
                })}
              />
              {errors.name && (
                <p className="text-danger small">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Brand </label>
              <select defaultValue=""
                className="form-select"
                name="brand"
                {...register("brandId", {
                  required: "Select a brand",
                })}
              >
                <option disabled value="">
                  Select Brand
                </option>
                {brands &&
                  brands.map((brand) => {
                    return (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    );
                  })}
              </select>
              {errors.brandId && (
                <p className="text-danger small">{errors.brandId.message}</p>
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

export default ModelFormModal;
