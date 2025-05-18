import axios from "axios";
const Base_url = import.meta.env.VITE_API_URL;

interface register_type {
  name: string,
  email: string,
  password: string,
  mobile: string
}
interface login_type {
  email: string,
  password: string,
}

export type Weight = "Weight" | "Volume" | "Size" | "Unit";
export type DiscountType = "PERCENTAGE";

interface Variant {
  quantity_type: Weight 
  quantity: string;
  price: number;
  discount_type: DiscountType;
  discount: number;
  discounted_price: number;
}

interface Item {
  restaurant_id: string;
  item_master_type_id: string;
  category_id: string;
  tag_id: string;
  display_name: string;
  name: string;
  is_add_on: boolean;
  image_url: string;
  description: string;
  variants: Variant[];
}

export function register_api(payload:register_type){
    return axios.post(`${Base_url}/authentication/restaurant-registration`, payload)
}
export function login_api(payload:login_type){
  return axios.post(`${Base_url}/authentication/login`, payload)
}
export function item_api(payload:Item, headers:any){
  return axios.post(`${Base_url}/items`, payload, headers)
}
export function get_item_all_api(header:any){
  return axios.get(`${Base_url}/item-master-types/all`, header)
}
export function get_all_category_api(header:any){
  return axios.get(`${Base_url}/categories/all`, header)
}
export function get_all_tags_api(header:any){
  return axios.get(`${Base_url}/tags/all`, header)
}
export function get_all_item_api(header:any, restaurant_id:any){
  return axios.get(`${Base_url}/items/all?restaurant_id=${restaurant_id}`, header)
}
export function delete_item_api(header:any, id:any){
  return axios.delete(`${Base_url}/items?id=${id}`, header)
}
export const put_item_api = (headers: any, itemId: string | number, payload: any) => {
  return axios.put(`https://your-api.com/items/${itemId}`, payload, headers);
};
