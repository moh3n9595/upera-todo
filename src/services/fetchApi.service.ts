import axios from 'axios';

import {Todo} from '@upera/types';

export const fetchApi = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const getTodos = () => fetchApi.get<Todo[]>('/todos');
export const patchTodo = (id: Todo['id'], todo: Partial<Todo>) => fetchApi.patch<Partial<Todo>>(`todos/${id}`, todo);
export const deleteTodo = (id: Todo['id']) => fetchApi.delete<Todo>(`todos/${id}`);
