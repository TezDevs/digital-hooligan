import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["primitives_boundary_tests/**/*.test.ts"],
  },
});
