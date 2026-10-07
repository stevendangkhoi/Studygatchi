export const TASK_REWARD = 10;
export const TASK_HP_RECOVERY = 10;
export const MAX_HEALTH = 100;

export interface StudyTask {
  id: number;
  name: string;
  completed: boolean;
}

export interface StudyState {
  tasks: StudyTask[];
  nextTaskId: number;
  money: number;
  health: number;
  xp: number;
  level: number;
}

export const initialStudyState: StudyState = {
  tasks: [
    { id: 1, name: "Lock in time", completed: false },
    { id: 2, name: "Read Chapters 2-3", completed: false },
    { id: 3, name: "Write new Draft", completed: false },
  ],
  nextTaskId: 4,
  money: 0,
  health: 50,
  xp: 50,
  level: 9,
};

type StudyAction =
  | { type: "add-task"; name: string }
  | { type: "complete-task"; id: number }
  | { type: "remove-task"; id: number }
  | { type: "tick" };

// Keep task completion and its reward in one pure update, including in StrictMode.
export function studyReducer(state: StudyState, action: StudyAction): StudyState {
  switch (action.type) {
    case "add-task": {
      const name = action.name.trim();
      if (!name) return state;
      return {
        ...state,
        nextTaskId: state.nextTaskId + 1,
        tasks: [...state.tasks, { id: state.nextTaskId, name, completed: false }],
      };
    }
    case "complete-task": {
      const task = state.tasks.find((item) => item.id === action.id);
      if (!task || task.completed) return state;
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === action.id ? { ...item, completed: true } : item
        ),
        money: state.money + TASK_REWARD,
        health: Math.min(MAX_HEALTH, state.health + TASK_HP_RECOVERY),
      };
    }
    case "remove-task":
      return { ...state, tasks: state.tasks.filter((item) => item.id !== action.id) };
    case "tick":
      if (state.health <= 0) {
        return { ...state, xp: 0, level: 0, health: MAX_HEALTH };
      }
      if (state.xp >= 100) {
        return { ...state, xp: 0, level: state.level + 1, money: state.money + 10 };
      }
      return { ...state, xp: state.xp + 1, health: Math.max(0, state.health - 0.1) };
  }
}
