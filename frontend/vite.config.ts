import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

// Component tests need Svelte's browser export condition (added by svelteTesting). Server tests
// must not get it: kit 3 then resolves the client variant of its internals, whose redirect()
// reads window.location. They run as a separate project without that plugin.
export default defineConfig({
	plugins: [sveltekit({ preprocess: vitePreprocess(), adapter: adapter() })],
	test: {
		projects: [
			{
				extends: true,
				plugins: [svelteTesting()],
				test: {
					name: 'components',
					environment: 'node',
					include: ['src/lib/components/**/*.test.ts'],
					setupFiles: ['./src/test-setup.ts']
				}
			},
			{
				extends: true,
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.test.ts'],
					exclude: ['src/lib/components/**'],
					setupFiles: ['./src/test-setup.ts']
				}
			}
		]
	}
});
