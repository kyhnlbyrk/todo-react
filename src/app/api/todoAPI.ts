import { post, get } from "./requestService";

export const BASE_URL = "/api/ws";

export function getAllToDo(search: string, orderType: string) {
    const url = '/getTodoList?search=' + search + '&orderType=' + orderType;
    return get(url);
}

export function changeStatus(id: number | undefined) {
    const url = '/changeStatus';
    const body = {
        id,
        status: 1
    }
    return post(url, body);
}

export function deleteTodo(id: number | undefined) {
    const url = '/deleteTodo';
    const body = {
        id,
        status: 1
    }
    return post(url, body);
}

export function createNewTodo(name: string) {
    const url = '/createNewTodo';
    const body = {
        name
    }
    return post(url, body);
}