export const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, {
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.description,
                priority: action.payload.priority,
                status: 'pending',
                createdAt: new Date()
            }];
        case 'UPDATE_TASK':
            return state.map(task =>
                task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
            );
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        case 'CLEAR_COMPLETED':
            return state.filter(task => task.status !== 'completed');
        default:
            return state;
    }
};