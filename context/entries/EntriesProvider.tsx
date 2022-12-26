import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { entriesApi } from "../../apis";
import { useSnackbar } from "notistack";
import Router from "next/router";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    dispatch({
      type: "[Entry] - Add-Entry",
      payload: data,
    });
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSanckbar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description: description,
        status: status,
      });
      dispatch({
        type: "[Entry] - Entry-Updated",
        payload: data,
      });

      if (showSanckbar) {
        enqueueSnackbar("Entrada actualizada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
      Router.push("/");
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await entriesApi.delete<Entry>(`/entries/${id}`);
      dispatch({
        type: "[Entry] - Delete-Entry",
        payload: id,
      });
      enqueueSnackbar("Entrada borrada", {
        variant: "warning",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      Router.push("/");
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({
      type: "[Entry] - Refresh-Data",
      payload: data,
    });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //Methods
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
