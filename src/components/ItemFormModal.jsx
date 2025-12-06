import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function ItemFormModal({ onClose, title, onSave, brands, models, Edit }) {
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
  const saveItem = (data) => {
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
        <form onSubmit={handleSubmit(saveItem)} className="modal-content">
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
              <label className="form-label">Amount</label>
              <input
                className="form-control"
                name="amount"
                type="number"
                {...register("amount", {
                  required: "amount is required",
                })}
              />
              {errors.amount && (
                <p className="text-danger small">{errors.amount.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Brand </label>
              <select
                defaultValue=""
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

            <div className="mb-3">
              <label className="form-label">Model (optional)</label>
              <select
                defaultValue=""
                className="form-select"
                name="model"
                {...register("modelId")}
              >
                <option disabled value="">
                  Select model
                </option>
                {models
                  .filter(
                    (model) => model.brandId === parseInt(watch("brandId"))
                  )
                  .map((model) => {
                    return (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    );
                  })}
              </select>
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

export default ItemFormModal;
