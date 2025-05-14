import {get_all_item_api} from "../api/api"
import { useEffect, useMemo } from "react";
import { useTable} from "react-table";
import { Columns } from "./columns.ts"
import Cookies from "js-cookie"
export function Added_items() {
    const columns = useMemo(() => Columns, [])
    const data = useMemo(() => all_items_get, [])
    useTable({
        columns,
        data,
    })

    const all_items_get = useEffect(() => {const get_table_item = async () => {
    try {
      const header_token = {
        headers: { Authorization: `Bearer ${Cookies.get("JWTToken")}`}
      }
      const get_table_all_items = await get_all_item_api(header_token)
      console.log(get_table_all_items.data)
    }
    catch (error){
      console.error(error)
    }
  }},[])
    
    return(
        <>
            
        </>
    )
}