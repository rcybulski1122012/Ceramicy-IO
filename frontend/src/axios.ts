import { default as ax } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';

const axios = ax.create({
  baseURL: 'http://0.0.0.0:8000/api/v1',
});

axios.interceptors.request.use(
  (config) => {
    if (
      config.data &&
      typeof config.data === 'object' &&
      config.headers['Content-Type'] == 'application/json'
    ) {
      config.data = decamelizeKeys(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to transform response data to camelCase
axios.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === 'object') {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
