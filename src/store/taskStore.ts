import { create } from 'zustand';
import { TaskItem, getAllTasks, addTask } from '../utils/handle-api';

interface TaskState {
  tasks: TaskItem[];
  loading: boolean;
  fetchTasks: () => Promise<void>;
  createTask: (text: string, completed: boolean, dueDate: string | null, onSuccess: () => void) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,

  fetchTasks: async () => {
    set({ loading: true });
    // Usamos a função do handle-api para atualizar o estado da store
    getAllTasks(
      (tasksAction) => {
        const nextTasks = typeof tasksAction === 'function' ? tasksAction([]) : tasksAction;
        set({ tasks: nextTasks, loading: false });
      },
      (loadingAction) => {
        const nextLoading = typeof loadingAction === 'function' ? loadingAction(true) : loadingAction;
        set({ loading: nextLoading });
      }
    );
  },

  createTask: async (text, completed, dueDate, onSuccess) => {
    addTask(text, completed, dueDate, (tasksAction) => {
      const nextTasks = typeof tasksAction === 'function' ? tasksAction([]) : tasksAction;
      set({ tasks: nextTasks });
    }, onSuccess);
  },
}));