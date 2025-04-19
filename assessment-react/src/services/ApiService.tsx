// src/services/ApiService.ts

import axios from 'axios';

class ApiService {
  // Set base URL for all axios calls
  static baseURL = 'https://localhost:7018/'; // Update this with your API base URL
//https://smspapi-cxhzera4excgckfw.canadacentral-01.azurewebsites.net/
  // Axios instance for custom configuration (like adding headers, timeouts, etc.)
  static axiosInstance = axios.create({
    baseURL: ApiService.baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Generic GET method
  static async get(endpoint: string, params: Record<string, any> = {}) {
    try {
      const response = await ApiService.axiosInstance.get(endpoint, { params });
      return response.data;  // Return the data directly
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic POST method
  static async post(endpoint: string, data: Record<string, any> = {}) {
    try {
      const response = await ApiService.axiosInstance.post(endpoint, data);
      return response.data;  // Return the data directly
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handling for failed API calls
  static handleError(error: any) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || 'API request failed';
    }
    return 'Unknown error occurred';
  }
}

export default ApiService;
