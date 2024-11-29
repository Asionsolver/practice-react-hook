import { CheckCircle, Trash2, Edit, Search, X, History } from 'lucide-react';
import TaskInput from './TaskInput';
import { useTask } from '../../hooks/useTask';
import { useState } from 'react';

const TaskList = () => {
    const {
        tasks,
        updateTask,
        deleteTask,
        filter,
        setFilter,
        clearCompleted,
        editTask,
        editingTask,
        saveEditedTask,
        searchQuery,
        setSearchQuery
    } = useTask();

    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedPriority, setEditedPriority] = useState('medium');
    const [expandedHistoryTaskId, setExpandedHistoryTaskId] = useState(null);
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'border-red-500';
            case 'medium': return 'border-yellow-500';
            case 'low': return 'border-green-500';
            default: return 'border-gray-300';
        }
    };



    const handleEditStart = (task) => {
        editTask(task);
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setEditedPriority(task.priority);
    };

    const handleSaveEdit = () => {
        if (!editedTitle.trim()) return;
        saveEditedTask(editingTask.id, {
            title: editedTitle,
            description: editedDescription,
            priority: editedPriority
        });
    };

    // Helper function to format date in 12-hour format
    const formatDateTime = (date, includeTime = true) => {
        if (!date) return '';
        const dateObj = new Date(date);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            ...(includeTime && {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            })
        };
        return dateObj.toLocaleString(undefined, options);
    };

     // Helper function to format edit history entries
     const formatEditHistoryEntry = (entry) => {
        const formattedTimestamp = formatDateTime(entry.timestamp);
        const changeDescriptions = entry.changes.map(change => 
            `${change.field}: ${change.oldValue} → ${change.newValue}`
        ).join(', ');
        return `${formattedTimestamp}: ${changeDescriptions}`;
    };

    const toggleTaskHistory = (taskId) => {
        setExpandedHistoryTaskId(prev => prev === taskId ? null : taskId);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-2xl mx-auto">
                <TaskInput />
                {/* Search Input */}
                <div className="mb-4 relative">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md pl-10 pr-10"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X />
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex justify-between mb-4">
                    <div className="flex space-x-2">
                        {['all', 'completed', 'pending'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-3 py-1 rounded-md ${filter === status
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700 border'
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    onClick={clearCompleted}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center mb-5"
                >
                    <Trash2 className="mr-2" /> Clear Completed
                </button>

                {tasks.length === 0 ? (
                    <div className="text-center text-gray-500">No tasks found</div>
                ) : (
                    tasks.map(task => (
                        <div
                            key={task.id}
                            className={`bg-white shadow-md rounded-lg p-4 mb-3 border-l-4 ${getPriorityColor(task.priority)}`}
                        >
                            {/* Existing task rendering logic */}
                        {task.editHistory && task.editHistory.length > 0 && (
                            <div className="mt-2">
                                <button 
                                    onClick={() => toggleTaskHistory(task.id)}
                                    className="text-gray-500 hover:text-gray-700 flex items-center"
                                >
                                    <History className="mr-2" /> 
                                    {expandedHistoryTaskId === task.id ? 'Hide' : 'Show'} Edit History
                                </button>
                                
                                {expandedHistoryTaskId === task.id && (
                                    <div className="bg-gray-50 p-2 rounded-md mt-2">
                                        <h4 className="text-sm font-semibold mb-2">Edit History:</h4>
                                        <ul className="text-xs text-gray-600 space-y-1">
                                            {task.editHistory.map((entry, index) => (
                                                <li key={index} className="border-b pb-1 last:border-b-0">
                                                    {formatEditHistoryEntry(entry)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                            {editingTask && editingTask.id === task.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md mb-2"
                                    />
                                    <textarea
                                        value={editedDescription}
                                        onChange={(e) => setEditedDescription(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md mb-2"
                                    />
                                    <select
                                        value={editedPriority}
                                        onChange={(e) => setEditedPriority(e.target.value)}
                                        className="px-3 py-2 border rounded-md mb-2"
                                    >
                                        <option value="low">Low Priority</option>
                                        <option value="medium">Medium Priority</option>
                                        <option value="high">High Priority</option>
                                    </select>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={handleSaveEdit}
                                            className="bg-green-500 text-white px-3 py-1 rounded-md"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => editTask(null)}
                                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                                            {task.title}
                                        </h3>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditStart(task)}
                                                className="text-blue-500 hover:text-blue-600"
                                            >
                                                <Edit />
                                            </button>
                                            <button
                                                onClick={() => updateTask(task.id, {
                                                    status: task.status === 'completed' ? 'pending' : 'completed'
                                                })}
                                                className={`${task.status === 'completed'
                                                    ? 'text-green-500 hover:text-green-600'
                                                    : 'text-gray-500 hover:text-green-500'
                                                    }`}
                                            >
                                                <CheckCircle />
                                            </button>
                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                <Trash2 />
                                            </button>
                                        </div>
                                    </div>
                                    {task.description && (
                                        <p className={`text-gray-600 ${task.status === 'completed' ? 'line-through' : ''}`}>
                                            {task.description}
                                        </p>
                                    )}
                                    <div className="text-sm text-gray-400 mt-2">
                                        Priority: {task.priority.toUpperCase()} |
                                        {/* Created: {new Date(task.createdAt).toLocaleString()} */}
                                        {formatDateTime(task.createdAt, task.lastEditedAt)}
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default TaskList;