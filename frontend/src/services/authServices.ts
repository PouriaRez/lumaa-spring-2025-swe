import API from "../api/axios";

interface AuthResponse {
    token : string;
}

export const login =  async (username: string, password: string) => {

    try {
        const response = await API.post<AuthResponse>("/auth/login", { username, password });

        const { token } = response.data;    

        localStorage.setItem('authToken', token);

        return token;

    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Login failed');
    }
};

export const register = async (username: string, password: string) => {
    try {
        await API.post("/auth/register", { username, password });
        console.log("Registered user...");
    } catch (error: any) {
        console.error("Registration failed:", error);  
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);  // This can be customized to return specific messages
          } else {
            throw new Error('An unknown error occurred');
          }
    }
};

export const logout = () => {
    localStorage.removeItem('authToken');
};