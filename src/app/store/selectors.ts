import { createSelector } from "@ngrx/store";
import { Item } from "../item";
import { State } from "./reducer";

export const selectAllItems = (state: State) => state.items;
export const getTodoItems = createSelector(
    selectAllItems,
    (items: Item[]) => items
);
