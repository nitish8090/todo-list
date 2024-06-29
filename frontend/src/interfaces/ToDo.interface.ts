// Define the input type without the id
interface ToDoInput {
  title: string;
  description: string;
  status: string;
}


interface ToDo extends ToDoInput {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default ToDo;
export type { ToDoInput };