import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const exportRoot = path.join(projectRoot, "..", "export");
const PREVIEW_ORIGIN = "http://127.0.0.1:4173";
const names = [
  "carousel-01-hook",
  "carousel-02-five",
  "carousel-03-xhigh",
  "carousel-04-tokenizer",
  "carousel-05-adaptive",
  "carousel-06-scaffolding",
  "carousel-07-hung-ui",
  "carousel-08-task-budgets",
  "carousel-09-claude-code",
  "carousel-10-cta",
];

function waitForHttpOk(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  const u = new URL(url);

  return new Promise((resolve, reject) => {
    function ping() {
      const req = http.request(
        {
          hostname: u.hostname,
          port: u.port,
          path: `${u.pathname}${u.search}`,
          method: "GET",
          timeout: 1500,
        },
        (res) => {
          res.resume();
          if (res.statusCode !== undefined && res.statusCode < 500) {
            resolve();
            return;
          }
          retry();
        },
      );
      req.on("error", retry);
      req.on("timeout", () => {
        req.destroy();
        retry();
      });
      req.end();
    }

    function retry() {
      if (Date.now() > deadline) {
        reject(new Error(`Timeout waiting for ${url}`));
        return;
      }
      setTimeout(ping, 300);
    }

    ping();
  });
}

const preview = spawn(
  "npx",
  ["vite", "preview", "--port", "4173", "--strictPort", "--host", "127.0.0.1"],
  {
    cwd: projectRoot,
    stdio: "inherit",
    shell: false,
  },
);

let previewExited = false;
preview.on("exit", () => {
  previewExited = true;
});

try {
  await waitForHttpOk(`${PREVIEW_ORIGIN}/`, 60_000);

  const browser = await chromium.launch();

  for (const { scale, dir } of [
    { scale: 1, dir: path.join(exportRoot, "png-1x") },
    { scale: 2, dir: path.join(exportRoot, "png-2x") },
  ]) {
    fs.mkdirSync(dir, { recursive: true });
    const context = await browser.newContext({
      viewport: { width: 1080, height: 1350 },
      deviceScaleFactor: scale,
    });
    const page = await context.newPage();

    for (let i = 1; i <= 10; i++) {
      const url = `${PREVIEW_ORIGIN}/?slide=${i}&embed=1`;
      await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const outPath = path.join(dir, `${names[i - 1]}.png`);
      await page.screenshot({
        path: outPath,
        type: "png",
      });
      console.log("Wrote", outPath);
    }

    await context.close();
  }

  await browser.close();
} finally {
  if (!previewExited) {
    preview.kill("SIGTERM");
  }
}
