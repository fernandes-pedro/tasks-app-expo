import React from 'react';
import { View } from 'react-native';
import { Heading, Text } from '@gluestack-ui/react';

const EmptyState: React.FC = () => (
  <View className="flex-1 items-center justify-center bg-slate-100 mx-4 my-8 rounded-3xl p-6 shadow-sm">
    <Heading className="text-2xl text-slate-900 mb-3 text-center">
      Nenhuma tarefa por enquanto
    </Heading>
    <Text className="text-base text-slate-600 text-center">
      Crie uma nova tarefa para começar a organizar o seu dia.
    </Text>
  </View>
);

export default EmptyState;
