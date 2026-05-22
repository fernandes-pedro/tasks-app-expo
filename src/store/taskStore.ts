import { create } from 'zustand';
import { TaskItem, getAllTasks, addTask, deleteTask, updateTask } from '../utils/handle-api';

interface TaskState {
  tasks: TaskItem[];
  loading: boolean;
  fetchTasks: () => Promise<void>;
  createTask: (text: string, completed: boolean, dueDate: string | null, onSuccess: () => void) => Promise<void>;
  updateTaskInStore: (taskId: string, text: string, completed: boolean, dueDate: string | null, onSuccess: () => void) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
  clearAllTasks: () => void; // Nova action adicionada
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,

  fetchTasks: async () => {
    set({ loading: true });
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

  updateTaskInStore: async (taskId, text, completed, dueDate, onSuccess) => {
    updateTask(taskId, text, completed, dueDate, (tasksAction) => {
      const nextTasks = typeof tasksAction === 'function' ? tasksAction([]) : tasksAction;
      set({ tasks: nextTasks });
    }, onSuccess);
  },

  removeTask: async (taskId) => {
    deleteTask(taskId, (tasksAction) => {
      const nextTasks = typeof tasksAction === 'function' ? tasksAction([]) : tasksAction;
      set({ tasks: nextTasks });
    });
  },


  clearAllTasks: () => {
    set({ tasks: [] });
  },
}));