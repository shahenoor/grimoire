import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // Fetch Job application by Id
    async getJobById(id) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/api/jobs/${id}`    
            );

            return response.data;
        }catch(error) {
            console.error('Failed to get the job application:',error);
        }
    }

    // Fetch all the Job application by a specific Date
    async getJobByDate(id, date) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/api/jobs/${id}/date/${date}`    
            );

            return response.data;
        }catch(error) {
            console.error('Failed to fetch the job application by date',error);
        }
    }

    // Fetch total Job count by month
    async getJobByMonth(id, month) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/api/jobs/${id}/month/${month}`    
            );

            return response.data;
        }catch(error) {
            console.error('Failed to fetch the job application by date',error);
        }
    }

    // Fetch all the jobs whose status is wishlist
    async getWishlistJobs(id) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/api/jobs/${id}/wishlist`    
            );

            return response.data;
        }catch(error) {
            console.error('Failed to fetch the job application by wishlist status',error);
        }
    }

    // Post a new Job Application
    async createJob(job) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/jobs`, job
            );

            return response.data;
        }catch(error) {
            console.error('Failed to post new job application:',error);
        }
    }

    // Update Job Application
    async updateJob(id, job) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/jobs/${id}`, job   
            );

            return response.data;
        }catch(error) {
            console.error('Failed to update job application:', error);
        }
    }

    // Delete Job Application
    async deleteJob(id) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/jobs/${id}`   
            );

            return response.data;
        }catch(error) {
            console.error('Failed to update job application:', error);
        }
    }
}

const apiClient = new ApiClient(baseUrl,apiKey);
export default apiClient;