import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { get_all_item_api, put_item_api } from "../api/api";

export function Edit_item() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const itemId = queryParams.get("id");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  // Fetch the item to edit
  useEffect(() => {
    const fetchItem = async () => {
      if (!itemId) return;

      try {
        const header_token = {
          headers: { Authorization: `Bearer ${Cookies.get("JWTToken")}` },
        };
        const restaurant_id = "448649b4-57a8-412f-9447-9f4ef0835b78";

        const response = await get_all_item_api(header_token, restaurant_id);
        const items = response.data.data;

        const itemToEdit = items.find((item: any) => item.id.toString() === itemId);
        if (itemToEdit) {
          setFormData({
            name: itemToEdit.name,
            description: itemToEdit.description,
            price: itemToEdit.ItemVariants?.[0]?.price?.toString() || "",
          });
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!itemId) {
      alert("No item ID found.");
      return;
    }

    try {
      const header_token = {
        headers: { Authorization: `Bearer ${Cookies.get("JWTToken")}` },
      };

      const payload = {
        name: formData.name,
        description: formData.description,
        ItemVariants: [{ price: parseFloat(formData.price) }],
      };

      await put_item_api(header_token, itemId, payload);

      alert("Item updated successfully!");
      navigate("/items_table");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
      <h2>Edit Item</h2>
      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <br />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <br />
      <button onClick={handleUpdate}>Update Item</button>
    </div>
  );
}
