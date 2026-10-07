# Frontend task-completion tests

Run from `frontend/` with Node.js 22.6 or newer (verified with Node.js 24):

```sh
npm test
npm run build
```

Tests use Node's built-in test runner and TypeScript stripping, without additional dependencies.
They cover one-time rewards, the HP cap, duplicate task names, missing/deleted tasks,
blank input, and timer updates preserving rewards.

For a browser check, run `npm run dev`, open `/todo`, and complete a task.
Cash should increase by $10 and health by up to 10 HP, capped at 100.
The health timer continues to subtract 0.1 HP each second, so the displayed value
may be slightly below the expected round number. The completed checkbox is disabled.
Visit Home and return to To Do: completion and money should remain unchanged,
except for the existing level-up reward when XP reaches 100.
Add two tasks with the same name and verify they can be completed independently.

This implements the frontend portion of Issue #81. State lives in App for the current
page session. Reloading resets tasks and stats. Account-specific backend storage and
server-authoritative rewards are future work.
