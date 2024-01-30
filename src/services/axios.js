import axios from 'axios';

export const api = axios.create({
	// baseURL: 'http://localhost:3000/api',
	baseURL:
		'https://lampara-nurse-scheduler-backend-production.up.railway.app/api',
});
