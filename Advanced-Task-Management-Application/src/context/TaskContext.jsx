/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer, useState } from 'react';
import { taskReducer } from '../reducers/taskReducer';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, [], () => {
        const localData = localStorage.getItem('tasks');
        return localData ? JSON.parse(localData) : [];
    });
    const [filter, setFilter] = useState('all');
    const [editingTask, setEditingTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Failed to save tasks', error);
        }
    }, [tasks]);

    const addTask = (title, description, priority) => {
        dispatch({
            type: 'ADD_TASK',
            payload: { title, description, priority }
        });
    };

    const updateTask = (id, updates) => {
        dispatch({
            type: 'UPDATE_TASK',
            payload: { id, updates }
        });
    };

    const editTask = (task) => {
        setEditingTask(task);
    };

    const saveEditedTask = (id, updatedTask) => {
        dispatch({
            type: 'UPDATE_TASK',
            payload: {
                id,
                updates: {
                    title: updatedTask.title,
                    description: updatedTask.description,
                    priority: updatedTask.priority
                }
            }
        });
        setEditingTask(null);
    };

    const deleteTask = (id) => {
        dispatch({ type: 'DELETE_TASK', payload: id });
    };

    const clearCompleted = () => {
        dispatch({ type: 'CLEAR_COMPLETED' });
    };

    // Combine filtering and searching
    const filteredTasks = tasks.filter(task => {
        // Filter by status
        const matchesStatus =
            filter === 'pending' ? task.status === 'pending' :
                filter === 'completed' ? task.status === 'completed' :
                    true;

        // Search logic
        const matchesSearch = !searchQuery ||
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            task.priority.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesStatus && matchesSearch;
    });


    return (
        <TaskContext.Provider value={{
            tasks: filteredTasks,
            addTask,
            updateTask,
            deleteTask,
            clearCompleted,
            filter,
            setFilter,
            editTask,
            saveEditedTask,
            editingTask,
            setEditingTask,
            searchQuery,
            setSearchQuery
        }}>
            {children}
        </TaskContext.Provider>
    );
}