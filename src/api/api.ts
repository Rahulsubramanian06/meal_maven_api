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

enum QuantityType {
  WEIGHT = "WEIGHT",
}

enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
}

interface item_type {
  restaurant_id: string;
  item_master_type_id: string;
  category_id: string;
  tag_id: string;
  name: string;
  display_name: string;
  description: string;
  is_add_on: true;
  image_url: string;
  variants: Array<{
    quantity_type: QuantityType;
    quantity: string;
    price: number;
    discount_type: DiscountType;
    discount: number;
    discounted_price: number;
  }>;
}

export function register_api(payload:register_type){
    return axios.post(`${Base_url}/authentication/restaurant-registration`, payload)
}
export function login_api(payload:login_type){
  return axios.post(`${Base_url}/authentication/login`, payload)
}
export function item_api(payload:item_type){
  return axios.post(`${Base_url}/items`, payload)
}