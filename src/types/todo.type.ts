/**
 * Represents a single todo item.
 * @property {number} userId - The unique id of the user who owns the todo.
 * @property {number} id - The unique id of the todo item.
 * @property {string} title - The title of the todo item.
 * @property {boolean} completed - Indicates whether the todo item has been completed.
 */
export interface Todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}
