export const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, {
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.description,
                priority: action.payload.priority,
                status: 'pending',
                createdAt: new Date(),
                lastEditedAt: null,  // Add last edited timestamp
                editHistory: []  // Add edit history array
            }];
        case 'UPDATE_TASK':
            return state.map(task => {
                if (task.id === action.payload.id) {
                    // Prepare the edit log entry
                    const editEntry = {
                        timestamp: new Date(),
                        changes: Object.keys(action.payload.updates).map(key => ({
                            field: key,
                            oldValue: task[key],
                            newValue: action.payload.updates[key]
                        }))
                    };

                    return {
                        ...task,
                        ...action.payload.updates,
                        lastEditedAt: new Date(),
                        editHistory: [...(task.editHistory || []), editEntry]
                    };
                }
                return task;
            });
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        case 'CLEAR_COMPLETED':
            return state.filter(task => task.status !== 'completed');
        default:
            return state;
    }
};