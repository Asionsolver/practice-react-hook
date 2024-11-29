
import { useState } from "react";
import { PlusCircle } from 'lucide-react';
import { useTask } from "../../hooks/useTask";
const TaskInput = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const { addTask } = useTask();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        // console.log(title, description, priority);

        addTask(title, description, priority);
        setTitle('');
        setDescription('');
        setPriority('medium');
    };
    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <input
                type="text"
                className="w-full px-3 py-2 border rounded-md mb-2"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                required
                placeholder="Task Description (Optional)"
                className="w-full px-3 py-2 border rounded-md mb-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex justify-between items-center">
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
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