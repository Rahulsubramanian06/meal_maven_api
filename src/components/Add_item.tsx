import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

export const Add_item = () => {
    
enum QuantityType {
  WEIGHT = "WEIGHT",
}
enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
}
const [item_data, setItem_data] = useState({
  restaurant_id: "",
  item_master_type_id: "",
  category_id: "",
  tag_id: "",
  name: "",
  display_name: "",
  description: "",
  is_add_on: false,
  image_url: "",
  variants: [
    {
      quantity_type: QuantityType.WEIGHT,
      quantity: "",
      price: 0,
      discount_type: DiscountType.PERCENTAGE,
      discount: 0,
      discounted_price: 0,
    },
  ],
});
  return (
    <div className="container my-4">
      <h4 className="mb-4 text-center">Add New Item</h4>

      <form>
        <div className="row g-3">
          <div className="col-md-6 col-12">
            <input type="text" className="form-control" placeholder="Item name" />
          </div>
          <div className="col-md-6 col-12">
            <input type="text" className="form-control" placeholder="Item master type" />
          </div>
          <div className="col-md-6 col-12">
            <input type="text" className="form-control" placeholder="Display name" />
          </div>
          <div className="col-md-6 col-12">
            <input type="text" className="form-control" placeholder="Category" />
          </div>
          <div className="col-md-6 col-12">
            <input type="text" className="form-control" placeholder="Tags" />
          </div>
        </div>

        <div className="card my-4">
          <div className="card-header">
            <strong>Pricing Details</strong>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6 col-12">
                <input type="text" className="form-control" placeholder="Quantity type" />
              </div>
              <div className="col-md-6 col-12">
                <input type="text" className="form-control" placeholder="Quantity" />
              </div>
              <div className="col-md-6 col-12">
                <input type="text" className="form-control" placeholder="Price" />
              </div>
              <div className="col-md-6 col-12">
                <input type="text" className="form-control" placeholder="Discount type" />
              </div>
              <div className="col-md-6 col-12">
                <input type="text" className="form-control" placeholder="Discount" />
              </div>
              <div className="col-md-6 col-12">
                <input type="text" className="form-control" placeholder="Discounted price" />
              </div>
            </div>

            <div className="mt-4">
              <button type="button" className="btn btn-primary">
                Add another variant
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
