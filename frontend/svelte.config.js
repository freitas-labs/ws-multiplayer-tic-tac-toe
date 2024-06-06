import { vitePreprocess } from '@sveltejs/kit/vite';

import adapter from '@sveltejs/adapter-static';

import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true
		}),

		alias: {
			'@presentation': path.resolve('./src/lib/presentation/index.ts'),
			'@presentation/components': path.resolve('./src/lib/presentation/components'),
			'@logging': path.resolve('./src/lib/logging/index.ts'),
			'@data': path.resolve('./src/lib/data/index.ts'),
			'@core': path.resolve('./src/lib/core/index.ts'),
			'@reactors': path.resolve('./src/lib/reactors/index.ts'),
			'@models': path.resolve('./src/lib/models/index.ts'),
			'@i18n': path.resolve('./src/i18n/index.ts')
		}
	}
};

export default config;
