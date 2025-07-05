import { execSync } from "child_process"

execSync(
  `npx typeorm-ts-node-esm migration:revert -d ./src/db/data-source.ts`,
  { stdio: "inherit" }
);


