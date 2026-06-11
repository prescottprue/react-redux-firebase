/* Seeds the RTDB emulator once for the whole vitest run.
 * The emulator itself is booted by `firebase emulators:exec` (see the
 * test scripts in package.json); per-worker client wiring is ./setup.js. */

// UID for fake user profile (must match test/setup.js)
const uid = 'Iq5b0qK2NtgggT6U3bU6iZRGyma2'

module.exports = async function globalSetup() {
  const res = await fetch(
    `http://127.0.0.1:9000/users/${uid}.json?ns=rrf-test`,
    { method: 'PUT', body: JSON.stringify({ displayName: 'Tester' }) }
  ).catch((err) => {
    throw new Error(
      `Could not reach the RTDB emulator (${err.message}). ` +
        'Run tests via `npm test`, which wraps vitest in `firebase emulators:exec`.'
    )
  })
  if (!res.ok) {
    throw new Error(`Failed to seed RTDB emulator: ${res.status}`)
  }
  return () => {}
}
