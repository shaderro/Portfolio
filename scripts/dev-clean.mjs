import { rmSync, existsSync } from "fs";
import { spawn, execSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function killDevPorts() {
  for (const port of [3000, 3001]) {
    try {
      if (process.platform === "win32") {
        const out = execSync(
          `netstat -ano | findstr :${port}`,
          { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] },
        );
        const pids = new Set(
          out
            .split("\n")
            .map((line) => line.trim().split(/\s+/).pop())
            .filter((pid) => pid && /^\d+$/.test(pid)),
        );
        for (const pid of pids) {
          try {
            execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
            console.log(`Stopped process ${pid} on port ${port}`);
          } catch {
            // already exited
          }
        }
      } else {
        execSync(`lsof -ti :${port} | xargs kill -9 2>/dev/null || true`, {
          shell: true,
          stdio: "ignore",
        });
      }
    } catch {
      // no process on this port
    }
  }
}

killDevPorts();

if (existsSync(join(root, ".next"))) {
  rmSync(join(root, ".next"), { recursive: true, force: true });
  console.log("Cleaned .next cache");
}

const child = spawn("npx", ["next", "dev"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => process.exit(code ?? 0));
