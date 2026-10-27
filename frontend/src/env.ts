import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	BACKEND_URL: {
		description: 'Server-side URL of the backend API. Never sent to the browser.',
		schema: (value) => value || 'http://localhost:8080'
	}
});
