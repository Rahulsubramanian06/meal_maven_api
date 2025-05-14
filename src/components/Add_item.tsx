import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import type { Weight, DiscountType } from "../api/api.ts";

import {
  get_all_category_api,
  get_item_all_api,
  get_all_tags_api,
  item_api,
  get_all_item_api,
} from "../api/api.ts";
import Cookies from "js-cookie";

export const Add_item = () => {
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
        quantity_type: "",
        quantity: "",
        price: "0",
        discount_type: "",
        discount: "0",
        discounted_price: "0",
      },
    ],
  });

  const [all_item, setAll_item] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [tags_list, setTags_list] = useState<any[]>([]);

  useEffect(() => {
    const get_all_items = async () => {
      try {
        const header_token = {
          headers: { Authorization: `Bearer ${Cookies.get("JWTToken")}` },
        };
        const all_items = await get_item_all_api(header_token);
        setAll_item(all_items.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    get_all_items();
  }, []);

  useEffect(() => {
    const get_all_category = async () => {
      try {
        const header_token = {
          headers: { Authorization: `Bearer ${Cookies.get("JWTToken")}` },
        };
        const all_categories = await get_all_category_api(header_token);
        setCategoryList(all_categories.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    get_all_category();
  }, []);

  useEffect(() => {
    const get_all_tag = async () => {
      try {
        const header_token = {
          headers: { Authorization: `Bearer ${Cookies.get("JWTToken")}` },
        };
        const all_tags = await get_all_tags_api(header_token);
        setTags_list(all_tags.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    get_all_tag();
  }, []);

  const handleChange_additem = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setItem_data((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setItem_data((prev) => ({
      ...prev,
      is_add_on: !prev.is_add_on,
    }));
  };

  const handleVariantChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedVariants = [...item_data.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [name]:
        name === "price" || name === "discount" || name === "discounted_price"
          ? Number(value)
          : value,
    };

    setItem_data((prev) => ({
      ...prev,
      variants: updatedVariants,
    }));
  };

  const handleitem = async () => {
    try {
      const payload = {
        restaurant_id: item_data.restaurant_id,
        item_master_type_id: item_data.item_master_type_id,
        category_id: item_data.category_id,
        tag_id: item_data.tag_id,
        name: item_data.name,
        description: item_data.description,
        display_name: item_data.display_name,
        is_add_on: item_data.is_add_on,
        image_url: item_data.image_url,
        variants: item_data.variants.map((v) => ({
          quantity_type: v.quantity_type as Weight, // cast string to union type
          quantity: v.quantity,
          price: parseFloat(v.price), // convert string to number
          discount_type: v.discount_type as DiscountType,
          discount: parseFloat(v.discount),
          discounted_price: parseFloat(v.discounted_price),
        })),
      };
      const header_token = {
        headers: { Authorization: `Bearer ${Cookies.get("JWTToken")}` },
      };
      const response = await item_api(payload, header_token);
      console.log(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
   
  return (
    <div className="container my-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0 text-center">Add New Item</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={item_data.name}
                  onChange={handleChange_additem}
                  placeholder="Enter item name"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Item Master Type</label>
                <select
                  className="form-select"
                  name="item_master_type_id"
                  value={item_data.item_master_type_id}
                  onChange={handleChange_additem}
                >
                  <option value="">Select an option</option>
                  {all_item.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Display Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="display_name"
                  value={item_data.display_name}
                  onChange={handleChange_additem}
                  placeholder="Enter display name"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Restaurant ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="restaurant_id"
                  value={item_data.restaurant_id}
                  onChange={handleChange_additem}
                  placeholder="Enter restaurant ID"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  name="category_id"
                  value={item_data.category_id}
                  onChange={handleChange_additem}
                >
                  <option value="">Select an option</option>
                  {categoryList.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Tags</label>
                <select
                  className="form-select"
                  name="tag_id"
                  value={item_data.tag_id}
                  onChange={handleChange_additem}
                >
                  <option value="">Select an option</option>
                  {tags_list.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.tag_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr className="my-4" />
            <h5 className="mb-3">Variants</h5>

            {item_data.variants.map((variant, index) => (
              <div key={index} className="card p-4 mb-4 border-0 shadow-sm">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Quantity Type</label>
                    <select
                      className="form-select"
                      name="quantity_type"
                      value={variant.quantity_type}
                      onChange={(e) => handleVariantChange(index, e)}
                    >
                      <option value="">Select</option>
                      <option value="Weight">Weight</option>
                      <option value="Volume">Volume</option>
                      <option value="Size">Size</option>
                      <option value="Unit">Unit</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Quantity</label>
                    <input
                      type="text"
                      className="form-control"
                      name="quantity"
                      value={variant.quantity}
                      onChange={(e) => handleVariantChange(index, e)}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, e)}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Discount Type</label>
                    <select
                      className="form-select"
                      name="discount_type"
                      value={variant.discount_type}
                      onChange={(e) => handleVariantChange(index, e)}
                    >
                      <option value="PERCENTAGE">PERCENTAGE</option>
                      <option value="FLAT">FLAT</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Discount</label>
                    <input
                      type="text"
                      className="form-control"
                      name="discount"
                      value={variant.discount}
                      onChange={(e) => handleVariantChange(index, e)}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Discounted Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="discounted_price"
                      value={variant.discounted_price}
                      onChange={(e) => handleVariantChange(index, e)}
                    />
                  </div>
                  <div className="col-md-4">
                    {index === item_data.variants.length - 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setItem_data((prev) => ({
                            ...prev,
                            variants: [
                              ...prev.variants,
                              {
                                quantity_type: "",
                                quantity: "",
                                price: "0",
                                discount_type: "",
                                discount: "0",
                                discounted_price: "0",
                              },
                            ],
                          }));
                        }}
                      >
                        Add varient
                      </button>
                    )}
                  </div>
                  <div className="col-md-4">
                    {item_data.variants.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          setItem_data((prev) => ({
                            ...prev,
                            variants: prev.variants.filter(
                              (_, i) => i !== index
                            ),
                          }));
                        }}
                      >
                        Delete variant
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label">Item Description</label>
              <textarea
                className="form-control"
                name="description"
                value={item_data.description}
                onChange={handleChange_additem}
                rows={2}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Item Image</label>
              <input
                type="file"
                className="form-control"
                name="image_url"
                onChange={handleChange_additem}
              />
            </div>

            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="addon-toggle"
                checked={item_data.is_add_on}
                onChange={handleToggle}
              />
              <label className="form-check-label" htmlFor="addon-toggle">
                Use it as an Add-on ({item_data.is_add_on ? "Yes" : "No"})
              </label>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary px-4"
                onClick={handleitem}
              >
                Save Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
