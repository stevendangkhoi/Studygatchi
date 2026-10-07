import assert from "node:assert/strict";
import test from "node:test";
import { initialStudyState, studyReducer } from "../src/studyState.ts";

test("completing a task grants cash and HP exactly once", () => {
  const completed = studyReducer(initialStudyState, { type: "complete-task", id: 1 });
  assert.equal(completed.money, 10);
  assert.equal(completed.health, 60);
  assert.equal(completed.tasks[0].completed, true);
  const repeated = studyReducer(completed, { type: "complete-task", id: 1 });
  assert.equal(repeated.money, 10);
  assert.equal(repeated.health, 60);
  assert.equal(initialStudyState.tasks[0].completed, false);
});

test("cash is still granted when HP reaches its cap", () => {
  for (const health of [95, 100]) {
    const result = studyReducer({ ...initialStudyState, health }, { type: "complete-task", id: 1 });
    assert.equal(result.health, 100);
    assert.equal(result.money, 10);
  }
});

test("tasks with the same name have independent completion and deletion", () => {
  let state = studyReducer(initialStudyState, { type: "add-task", name: "Homework" });
  state = studyReducer(state, { type: "add-task", name: "Homework" });
  state = studyReducer(state, { type: "complete-task", id: 4 });
  assert.equal(state.tasks.find((task) => task.id === 4)?.completed, true);
  assert.equal(state.tasks.find((task) => task.id === 5)?.completed, false);
  state = studyReducer(state, { type: "remove-task", id: 4 });
  assert.equal(state.tasks.some((task) => task.id === 4), false);
  assert.equal(state.tasks.some((task) => task.id === 5), true);
  state = studyReducer(state, { type: "complete-task", id: 5 });
  assert.equal(state.money, 20);
});

test("missing and deleted tasks cannot grant rewards", () => {
  const removed = studyReducer(initialStudyState, { type: "remove-task", id: 1 });
  for (const id of [1, 999]) {
    const result = studyReducer(removed, { type: "complete-task", id });
    assert.equal(result.money, 0);
    assert.equal(result.health, 50);
  }
});

test("blank tasks are rejected and new names are trimmed", () => {
  assert.deepEqual(studyReducer(initialStudyState, { type: "add-task", name: "  " }), initialStudyState);
  const added = studyReducer(initialStudyState, { type: "add-task", name: "  Homework  " });
  assert.equal(added.tasks.at(-1)?.name, "Homework");
});

test("timer updates preserve task rewards and completed status", () => {
  const completed = studyReducer(initialStudyState, { type: "complete-task", id: 1 });
  const ticked = studyReducer(completed, { type: "tick" });
  assert.equal(ticked.money, 10);
  assert.equal(ticked.health, 59.9);
  assert.equal(ticked.tasks[0].completed, true);
  const leveled = studyReducer({ ...completed, xp: 100 }, { type: "tick" });
  assert.equal(leveled.money, 20);
  assert.equal(leveled.level, completed.level + 1);
});
