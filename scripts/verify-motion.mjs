import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'

const host = '127.0.0.1'
const port = 4175
const baseUrl = `http://${host}:${port}`
const session = `motion-check-${process.pid}`
const viteEntry = resolve('node_modules/vite/bin/vite.js')
const npxEntry = resolve(dirname(process.env.npm_execpath), 'npx-cli.js')
const motionCheck = resolve('scripts/motion-browser-check.js')
const browserWorkspace = mkdtempSync(join(tmpdir(), 'orange-motion-check-'))

const server = spawn(process.execPath, [viteEntry, '--host', host, '--port', String(port)], {
  stdio: 'ignore'
})

async function waitForServer() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(baseUrl)
      if (response.ok) return
    } catch {}
    await new Promise(resolveWait => setTimeout(resolveWait, 120))
  }
  throw new Error('Timed out waiting for the Vite motion test server.')
}

function runCli(command, extraArgs = []) {
  const result = spawnSync(process.execPath, [
    npxEntry,
    '--yes',
    '--package',
    '@playwright/cli',
    'playwright-cli',
    '--session',
    session,
    command,
    ...extraArgs
  ], {
    cwd: browserWorkspace,
    encoding: 'utf8',
    stdio: 'pipe'
  })

  if (result.status !== 0 || result.stdout?.includes('### Error')) {
    throw new Error([result.error?.message, result.stdout, result.stderr].filter(Boolean).join('\n'))
  }
  return result.stdout
}

try {
  await waitForServer()
  runCli('open', [baseUrl])
  runCli('run-code', ['--filename', motionCheck])

  console.log('Motion behavior check passed.')
} finally {
  try {
    runCli('close')
  } catch {}
  server.kill()
  rmSync(browserWorkspace, { recursive: true, force: true })
}
