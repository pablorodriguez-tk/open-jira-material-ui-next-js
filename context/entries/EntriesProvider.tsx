import { FC, PropsWithChildren, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { v4 as uuidv4 } from "uuid";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "pending: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, porro.",
      createdAt: Date.now(),
      status: "pending",
    },
    {
      _id: uuidv4(),
      description:
        "in-progress: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, aperiam?",
      createdAt: Date.now() - 1000000,
      status: "in-progress",
    },
    {
      _id: uuidv4(),
      description:
        "finished: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, sed?",
      createdAt: Date.now() - 100000,
      status: "finished",
    },
  ],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({
      type: "[Entry] - Add-Entry",
      payload: newEntry,
    });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //Methods
        addNewEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
