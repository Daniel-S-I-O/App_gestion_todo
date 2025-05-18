import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, TextInput, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addTask } from '../../api/tasks';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const router = useRouter();
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#fff' : '#000';
  const backgroundColor = isDark ? '#121212' : '#fff';

  const handleAdd = async () => {
    if (title.trim()) {
      await addTask({ title, completed: false });
      router.back();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor }}>
      <TextInput
        placeholder="Título de la tarea"
        placeholderTextColor={isDark ? '#aaa' : '#666'}
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          color: textColor,
        }}
      />
      <Button title="Guardar" onPress={handleAdd} />
    </SafeAreaView>
  );
}
