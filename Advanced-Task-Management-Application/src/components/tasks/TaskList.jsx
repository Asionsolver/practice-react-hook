import { CheckCircle, Trash2, Edit, Search, X, History, ChevronRight, ChevronLeft } from 'lucide-react';
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
        setSearchQuery,
        historySearchQuery,
        setHistorySearchQuery,
        filterEditHistory
    } = useTask();

    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedPriority, setEditedPriority] = useState('medium');
    const [expandedHistoryTaskId, setExpandedHistoryTaskId] = useState(null);
    const [historyPage, setHistoryPage] = useState({});


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
        // Reset page when opening history
        setHistoryPage(prev => ({ ...prev, [taskId]: 1 }));
    };

    // Pagination for edit history with search
    const renderPaginatedHistory = (task) => {
        const itemsPerPage = 5;
        const currentPage = historyPage[task.id] || 1;

        // Filter edit history based on search query
        const filteredHistory = filterEditHistory(task.editHistory || []);

        // Reverse the history to show most recent first
        const reversedHistory = [...filteredHistory].reverse();

        // Calculate total pages
        const totalPages = Math.ceil(reversedHistory.length / itemsPerPage);

        // Slice the history for current page
        const paginatedHistory = reversedHistory.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

        // Pagination handlers
        const goToPrevPage = () => {
            setHistoryPage(prev => ({
                ...prev,
                [task.id]: Math.max(1, (prev[task.id] || 1) - 1)
            }));
        };

        const goToNextPage = () => {
            setHistoryPage(prev => ({
                ...prev,
                [task.id]: Math.min(totalPages, (prev[task.id] || 1) + 1)
            }));
        };
        return (
            <div className="bg-gray-50 p-2 rounded-md mt-2">
                {/* Edit History Search Input */}
                <div className="relative mb-2">
                    <input
                        type="text"
                        placeholder="Search edit history..."
                        value={historySearchQuery}
                        onChange={(e) => {
                            setHistorySearchQuery(e.target.value);
                            // Reset to first page when searching
                            setHistoryPage(prev => ({ ...prev, [task.id]: 1 }));
                        }}
                        className="w-full px-3 py-2 border rounded-md text-xs"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>

                <h4 className="text-sm font-semibold mb-2">
                    Edit History
                    {historySearchQuery && (
                        <span className="ml-2 text-xs text-gray-500">
                            ({filteredHistory.length} results)
                        </span>
                    )}
                </h4>

                {paginatedHistory.length > 0 ? (
                    <ul className="text-xs text-gray-600 space-y-1">
                        {paginatedHistory.map((entry, index) => (
                            <li key={index} className="border-b pb-1 last:border-b-0">
                                {formatEditHistoryEntry(entry)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-xs text-gray-500 text-center">
                        No edit history found
                    </p>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-2 border-t pt-2">
                        <button
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className="flex items-center text-xs text-gray-600 disabled:opacity-50"
                        >
                            <ChevronLeft size={16} /> Previous
                        </button>
                        <span className="text-xs text-gray-500">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="flex items-center text-xs text-gray-600 disabled:opacity-50"
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        );
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
                                        <span className="ml-2 text-xs text-gray-400">({task.editHistory.length})</span>
                                    </button>

                                    {expandedHistoryTaskId === task.id && renderPaginatedHistory(task)}
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