import axios from 'axios';
import { Task } from '../types';

const API = 'https://jsonplaceholder.typicode.com/todos';

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(`${API}?_limit=30`);
  return res.data;
};

export const addTask = async (task: Partial<Task>): Promise<Task> => {
  const res = await axios.post(API, task);
  return res.data;
};

export async function updateTask(id: number, updates: Partial<Task>) {
  await axios.put(`/tasks/${id}`, updates);
}

export async function deleteTask(id: number) {
  await axios.delete(`/tasks/${id}`);
}