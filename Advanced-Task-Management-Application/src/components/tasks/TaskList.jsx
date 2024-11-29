import { CheckCircle, Trash2 } from 'lucide-react';
import TaskInput from './TaskInput';
import { useTask } from '../../hooks/useTask';

const TaskList = () => {
    const { tasks, updateTask, deleteTask, filter, setFilter, clearCompleted } = useTask();

    // console.log(tasks);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'border-red-500';
            case 'medium': return 'border-yellow-500';
            case 'low': return 'border-green-500';
            default: return 'border-gray-300';
        }
    };
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-2xl mx-auto">

                <TaskInput />



                <div className="flex justify-between mb-4">
                    <div className="flex space-x-2">
                        {
                            ['all', 'completed', 'pending'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    // onClick={() => console.log(status)}
                                    className={`px-3 py-1 rounded-md ${filter === status
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-gray-700 border'
                                        }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))
                        }
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
                            <div className="flex justify-between items-center mb-2">
                                <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : ''
                                    }`}>
                                    {task.title}
                                </h3>
                                <div className="flex space-x-2">
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
                                <p className={`text-gray-600 ${task.status === 'completed' ? 'line-through' : ''
                                    }`}>
                                    {task.description}
                                </p>
                            )}
                            <div className="text-sm text-gray-400 mt-2">
                                Priority: {task.priority.toUpperCase()} |
                                Created: {new Date(task.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>

    );
}

export default TaskList