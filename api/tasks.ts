import axios from '../api/axios';
import { Task } from '../types';

const API = 'todos';

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(`${API}`);
  return res.data;
};

export const addTask = async (task: Partial<Task>): Promise<Task> => {
  const res = await axios.post(API, task);
  return res.data;
};

export async function updateTask(id: number, updates: Partial<Task>) {
  await axios.put(`${API}/${id}`, updates);
}

export async function deleteTask(id: number) {
  await axios.delete(`${API}/${id}`);
}