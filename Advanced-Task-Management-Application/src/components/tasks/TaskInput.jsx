
import { useState } from "react";
import { PlusCircle } from 'lucide-react';
import { useTask } from "../../hooks/useTask";
const TaskInput = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: 'medium'
    });
    const { addTask } = useTask();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.title.trim()) return;
        // console.log(title, description, priority);

        addTask(task.title, task.description, task.priority);
        setTask({
            title: '',
            description: '',
            priority: 'medium'
        });
    };
    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <input
                type="text"
                className="w-full px-3 py-2 border rounded-md mb-2"
                placeholder="Task Title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
            />
            <textarea
                required
                placeholder="Task Description (Optional)"
                className="w-full px-3 py-2 border rounded-md mb-2"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
            />

            <div className="flex justify-between items-center">
                <select
                    value={task.priority}
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
                >
                    <PlusCircle className="mr-2" /> Add Task
                </button>
            </div>
        </form>
    )
}

export default TaskInput