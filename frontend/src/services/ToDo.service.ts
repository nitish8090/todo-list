import axios from "axios";
import ToDo, { ToDoInput } from "../interfaces/ToDo.interface";

export default class ToDoService {
    baseURL: string;

    constructor() {
        this.baseURL = "http://localhost:8000";
    }

    async create(todo: ToDoInput): Promise<ToDo> {
        const response  = await axios.post(`${this.baseURL}/register/todos/`, todo);
        return response.data
    }

    async update(todo: ToDo): Promise<ToDo> {
        const response  = await  axios.put(`${this.baseURL}/register/todos/${todo.id}/`, todo);
        return response.data
    }

    async delete(id: number){
        const response  = await  axios.delete(`${this.baseURL}/register/todos/${id}`);
        return response.data
    }

    async list(): Promise<ToDo[]> {
        const response  = await  axios.get(`${this.baseURL}/register/todos`);
        return response.data
    }

    async get(id: number): Promise<ToDo> {
        const response  = await  axios.get(`${this.baseURL}/register/todos/${id}`);
        return response.data
    }
}