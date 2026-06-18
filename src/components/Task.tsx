import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

interface TaskProps {
  text: string;
  updateMode: () => void;
  deleteTask: () => void;
}

const Task: React.FC<TaskProps> = ({ text, updateMode, deleteTask }) => {
  return (
    <View className="bg-white rounded-xl shadow p-4 mt-4 flex-row items-center justify-between">
      <Text className="text-slate-900 text-base flex-1">{text}</Text>
      <View className="flex-row space-x-4 ml-4">
        <TouchableOpacity onPress={updateMode} className="p-2">
          <Feather name="edit" size={20} color="#0f172a" />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteTask} className="p-2">
          <AntDesign name="delete" size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Task;
