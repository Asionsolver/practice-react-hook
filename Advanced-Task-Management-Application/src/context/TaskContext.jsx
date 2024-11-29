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

    useEffect(() => {
        // Optional: Add error handling
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            // Handle storage errors (e.g., storage full)
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

    const deleteTask = (id) => {
        dispatch({ type: 'DELETE_TASK', payload: id });
    };

    const clearCompleted = () => {
        dispatch({ type: 'CLEAR_COMPLETED' });
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'pending') return task.status === 'pending';
        if (filter === 'completed') return task.status === 'completed';
        return true;
    });

    return (
        <TaskContext.Provider value={{
            tasks: filteredTasks,
            addTask,
            updateTask,
            deleteTask,
            clearCompleted,
            filter,
            setFilter
        }}>
            {children}
        </TaskContext.Provider>
    );

}