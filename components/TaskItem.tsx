import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { deleteTask, updateTask } from '../api/tasks';
import { Task } from '../types';

type Props = {
  task: Task;
  onToggleComplete?: () => void;
  onDelete?: () => void;
};

export default function TaskItem({ task, onToggleComplete, onDelete }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const bgColor = isDark ? '#1e1e1e' : '#f1f1f1';
  const textColor = isDark ? '#fff' : '#000';

  const handleToggleComplete = async () => {
    await updateTask(task.id, { completed: !task.completed });
    onToggleComplete?.();
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Quieres eliminar la tarea "${task.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await deleteTask(task.id);
            onDelete?.();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={[styles.item, { backgroundColor: bgColor, flexDirection: 'row', alignItems: 'center' }]}>
      <View style={styles.buttonsGroup}>
        <TouchableOpacity
          onPress={handleToggleComplete}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel={task.completed ? 'Marcar como no completada' : 'Marcar como completada'}
        >
          <MaterialIcons
            name={task.completed ? 'check-box' : 'check-box-outline-blank'}
            size={22}
            color={task.completed ? '#4CAF50' : textColor}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Eliminar tarea"
        >
          <MaterialIcons name="delete" size={22} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <Text
        style={task.completed ? [styles.completed, { color: textColor }] : [styles.text, { color: textColor }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {task.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    flexShrink: 1,
    marginLeft: 12, // espacio entre botones y texto
  },
  completed: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    flexShrink: 1,
    marginLeft: 12,
  },
  buttonsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  iconButton: {
    marginLeft: 12,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    overflow: 'hidden',
  },
});
