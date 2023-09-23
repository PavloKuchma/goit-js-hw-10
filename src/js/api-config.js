import axios from 'axios';
export const header = (axios.defaults.headers.common['x-api-key'] =
  'live_vMKmPqjJu4ubtl2A2lrfIEbDs9VrGfJbvVYNtihu4Et64i8AzmD63AyItlGiHZJV');
export const BASE_URL = (axios.defaults.baseURL =
  'https://api.thecatapi.com/v1/');
