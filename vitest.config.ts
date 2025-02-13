import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/setupTests.ts'],
        exclude: ['./src/hooks/useOrderSpy.test.ts',
            './src/hooks/useOrder.test.ts',
            // './src/hooks/useOrderMsw.test.ts',
            '**/node_modules/**',
            '**/dist/**',
            '**/cypress/**',
            '**/.{idea,git,cache,output,temp}/**',
            './src/config/**',],
    },
});