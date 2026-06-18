import React, { useMemo } from 'react';
import { SectionList, StyleSheet, View, Text } from 'react-native';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';
import { useTaskStore } from '../store/taskStore';
import { TaskItem as TaskType } from '../utils/handle-api';

interface TaskListProps {
  onEdit: (task: TaskType) => void;
  filter: 'all' | 'completed' | 'pending';
}

const TaskList: React.FC<TaskListProps> = ({ onEdit, filter }) => {
  // Pegando as tasks diretamente da Store global do Zustand
  const tasks = useTaskStore((state) => state.tasks);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filter === 'completed') return t.completed;
      if (filter === 'pending') return !t.completed;
      return true;
    });
  }, [tasks, filter]);

  const sections = useMemo(() => {
    const completedTasks = filteredTasks.filter((task) => task.completed);
    const pendingTasks = filteredTasks.filter((task) => !task.completed);

    return [
      { title: '📋 Pendentes', data: pendingTasks },
      { title: '✅ Concluídas', data: completedTasks },
    ];
  }, [filteredTasks]);

  if (filteredTasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <View style={styles.listContainer}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEdit={() => onEdit(item)}
          />
        )}
        renderSectionFooter={({ section }) => 
          section.data.length === 0 ? (
            <Text style={styles.emptySectionText}>Nenhuma tarefa nesta categoria.</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    padding: 12,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  emptySectionText: {
    padding: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  }
});

export default TaskList;