import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, FlatList, Text, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTasks } from '../../api/tasks';
import TaskItem from '../../components/TaskItem';
import { Task } from '../../types';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#fff' : '#000';
  const backgroundColor = isDark ? '#121212' : '#fff';

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: textColor }}>
        Lista de Tareas
      </Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskItem task={item} />}
      />
      <Button title="Agregar tarea" onPress={() => router.push('/add')} />
    </SafeAreaView>
  );
}
