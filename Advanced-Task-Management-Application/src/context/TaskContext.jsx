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
    const [historySearchQuery, setHistorySearchQuery] = useState('');


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

    // New method to filter edit history
    const filterEditHistory = (editHistory) => {
        if (!historySearchQuery) return editHistory;

        const lowerCaseQuery = historySearchQuery.toLowerCase();
        return editHistory.filter(entry => {
            // Search through changes
            const changesMatch = entry.changes.some(change =>
                String(change.field).toLowerCase().includes(lowerCaseQuery) ||
                String(change.oldValue).toLowerCase().includes(lowerCaseQuery) ||
                String(change.newValue).toLowerCase().includes(lowerCaseQuery)
            );

            // Search through timestamp
            const timestampMatch = new Date(entry.timestamp)
                .toLocaleString()
                .toLowerCase()
                .includes(lowerCaseQuery);

            return changesMatch || timestampMatch;
        });
    };

    // Enhanced filtering for tasks
    const filteredTasks = tasks.filter(task => {
        // Existing status and search logic
        const matchesStatus =
            filter === 'pending' ? task.status === 'pending' :
                filter === 'completed' ? task.status === 'completed' :
                    true;

        // Search logic for tasks and their edit history
        const matchesSearch = !searchQuery ||
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            task.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (task.editHistory && task.editHistory.some(entry =>
                entry.changes.some(change =>
                    String(change.oldValue).toLowerCase().includes(searchQuery.toLowerCase()) ||
                    String(change.newValue).toLowerCase().includes(searchQuery.toLowerCase())
                )
            ));

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
            setSearchQuery,
            historySearchQuery,
            setHistorySearchQuery,
            filterEditHistory
        }}>
            {children}
        </TaskContext.Provider>
    );
}