/**
 * Runs before every unit test file.
 *
 * Unit tests are pure by default (no database, no network). Tests that need
 * MongoDB import `useTestDb()` from `tests/setup/db.ts`, which spins up an
 * isolated in-memory database for that file.
 *
 * Component tests opt into the DOM per file with:
 *   // @vitest-environment jsdom
 */
process.env.ROOT_DOMAIN ??= 'localhost:3000'
