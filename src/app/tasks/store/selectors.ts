import {createSelector} from "@ngrx/store";
import {Item} from "../item/item";
import {State} from "./tasks.reducer";

export const selectAllItems = (state: State) => state.items;
export const getTodoItems = createSelector(
    selectAllItems,
    (items: Item[]) => items
);
