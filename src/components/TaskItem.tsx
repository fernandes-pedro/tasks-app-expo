import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { TaskItem as TaskType } from '../utils/handle-api';
import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@gluestack-ui/react';

// Conexão com a Store do Zustand
import { useTaskStore } from '../store/taskStore';

interface TaskItemProps {
  task: TaskType;
  onEdit: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  // Pegando a action de remoção direto do Zustand
  const removeTask = useTaskStore((state) => state.removeTask);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));

  const handleDeleteConfirm = () => {
    removeTask(task._id);
    setIsAlertOpen(false);
  };

  return (
    <>
      <View style={styles.task}>
        <View style={styles.contentContainer}>
          <Text style={[styles.text, !!task.completed && styles.textCompleted]}>
            {task.text}
          </Text>
          {task.dueDate && (
            <Text style={[styles.dateText, isOverdue ? styles.dateOverdue : styles.dateOnTime]}>
              Até: {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          )}
        </View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={onEdit} accessibilityRole="button">
            <Feather name="edit" size={20} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setIsAlertOpen(true)} accessibilityRole="button">
            <AntDesign name="delete" size={20} color="#fff" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <AlertDialog isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text style={styles.alertTitle}>Confirmar exclusão</Text>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text style={styles.alertMessage}>Tem certeza que deseja excluir esta tarefa?</Text>
          </AlertDialogBody>
          <AlertDialogFooter style={styles.alertFooter}>
            <TouchableOpacity style={styles.alertCancelButton} onPress={() => setIsAlertOpen(false)}>
              <Text style={styles.alertCancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.alertDeleteButton} onPress={handleDeleteConfirm}>
              <Text style={styles.alertDeleteText}>Excluir</Text>
            </TouchableOpacity>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const styles = StyleSheet.create({
  task: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    marginRight: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  dateText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },
  dateOverdue: {
    color: '#e53935',
  },
  dateOnTime: {
    color: '#43a047',
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
  },
  icon: {
    padding: 2,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  alertMessage: {
    fontSize: 16,
    color: '#333',
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  alertCancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#999',
  },
  alertCancelText: {
    color: '#333',
    fontWeight: 'bold',
  },
  alertDeleteButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: '#d32f2f',
  },
  alertDeleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TaskItem;