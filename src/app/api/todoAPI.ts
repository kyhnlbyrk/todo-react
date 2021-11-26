import axios from "axios";
import { post, get } from "./requestService";

export const BASE_URL = "/api/ws";

export function getAllToDo(search: string, orderType: string) {
    let url = '/getTodoList?search=' + search + '&orderType=' + orderType;
    return get(url);
}