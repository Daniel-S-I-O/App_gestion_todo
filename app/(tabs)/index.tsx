import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Button, FlatList, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTasks, updateTask } from '../../api/tasks';
import TaskItem from '../../components/TaskItem';
import { Task } from '../../types';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#fff' : '#000';

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      console.log('Tareas desde API:', data); // DEBUG
      setTasks(data);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const handleToggleTask = async (id: number, currentComplete: boolean) => {
    try {
      await updateTask(id, { completed: !currentComplete });
      await loadTasks();
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      // await deleteTask(id);
      await loadTasks();
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: isDark ? '#121212' : '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: textColor }}>
        Lista de Tareas
      </Text>

      {loading ? (
        <Text style={{ color: textColor }}>Cargando tareas...</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggleComplete={() => handleToggleTask(item.id, item.completed)}
              onDelete={() => handleDeleteTask(item.id)}
            />
          )}
          ListEmptyComponent={<Text style={{ color: textColor }}>No hay tareas.</Text>}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Agregar tarea" onPress={() => router.push('/add')} />
      </View>
    </SafeAreaView>
  );
}
