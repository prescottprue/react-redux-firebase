/* Boots the in-memory firebase-server once for the whole vitest run.
 * Per-worker firebase client wiring lives in ./setup.js. */
const FirebaseServer = require('firebase-server')

// UID for fake user profile (must match test/setup.js)
const uid = 'Iq5b0qK2NtgggT6U3bU6iZRGyma2'

module.exports = function globalSetup() {
  const server = new FirebaseServer(5000, 'localhost.firebaseio.test', {
    users: {
      [uid]: {
        displayName: 'Tester'
      }
    }
  })
  return () => server.close()
}
