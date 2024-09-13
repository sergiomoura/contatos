import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vitest-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    watchExclude:["./src/databases/**"],
    coverage: {
      provider: 'istanbul'
    }
  }
})