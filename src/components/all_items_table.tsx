import { delete_item_api, get_all_item_api, put_item_api } from "../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

export function All_items_table() {
      const navigate = useNavigate()

  const [items, setItems] = useState([]);
  useEffect(() => {
    const get_table_item = async () => {
      try {
        const header_token = {
          headers: { Authorization: `Bearer ${Cookies.get("JWTToken")}` },
        };
        const restaurant_id = "448649b4-57a8-412f-9447-9f4ef0835b78";
        const get_table_all_items = await get_all_item_api(
          header_token,
          restaurant_id
        );
        console.log(get_table_all_items.data);
        setItems(get_table_all_items.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    get_table_item();
  }, []);
  const delete_item = async (id: number) => {
    try {
      const header_token = {
        headers: { Authorization: `Bearer ${Cookies.get("JWTToken")}` },
      };
      const delete_single_item = await delete_item_api(header_token, id);
      console.log(delete_single_item);
      const updated_table_item = items.filter((item: any) => item.id !== id);
      setItems(updated_table_item);
    } catch (error) {
      console.error(error);
    }
  };
  const update_items = (item:any) => {
    navigate (`/item_table?id=${item.id}`)
  }
  return (
    <div>
      <h1>All Items</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                {item.ItemVariants?.[0]?.price ?? "N/A"}
                <button onClick={() => update_items(item)}>Edit</button>{" "}
                <button onClick={() => delete_item(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
