import API from "../api/axios";

export const createTask = async (taskData : { title: string, description: string} ) => {
    try {
        const response = await API.post("/tasks/", taskData);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error("Error Creating Task: ", err);
        throw new Error("Unable to create task.");
    }
};

export const updateTask = async (taskID: number, task: { title: string; description: string; iscomplete: boolean}) => {
    try {
        const response = await API.put(`/tasks/${taskID}`, task);
        return response.data;
        
    } catch (err) {
        console.error("Error Updating Task: ", err);
        throw new Error("Unable to update task.");
    }
}

export const retrieveTasks = async () => {
    try {
        const response = await API.get("/tasks/");
        return response.data;
    } catch (err) {
        console.error("Error fetching Tasks: ", err);
        throw new Error("Unable to fetch tasks.");
    }
}

export const deleteTask = async (taskID: number) => {
    try {
        const response = await API.delete(`/tasks/${taskID}`);
        return response.data;
        
    } catch (err) {
        console.error("Error deleting Task: ", err);
        throw new Error("Unable to delete task.");
    }
} 