import { EntriesState } from "./";

type EntriesActionType = { type: "[entries] - ActionName" };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[entries] - ActionName":
      return {
        ...state,
      };
    default:
      return state;
  }
};
