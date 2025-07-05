import { execSync } from "child_process"

execSync(
  `npx typeorm-ts-node-esm migration:run -d ./src/db/data-source.ts`,
  { stdio: "inherit" }
);


