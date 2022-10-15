import { createReducer, createSelector, on } from "@ngrx/store";
import * as TasksActions from "./actions";
import { Item } from "../item";

export interface State {
    items: Array<Item>;
}

export const initialState: State = {
    items: [],
};

export const tasksReducer = createReducer(
    initialState,
    on(TasksActions.loadItems, (state, { response }) => ({
        ...state,
        items: response,
    })),
    on(TasksActions.createItem, (state, { response }) => ({
        ...state,
        items: state.items.concat(response),
    })),
    on(TasksActions.deleteItem, (state, { id }) => ({
        ...state,
        items: removeItemFromList(state.items, id),
    })),
    on(TasksActions.editItem, (state, { id, item }) => ({
        ...state,
        items: updateItemDetails(state.items, id, item),
    }))
);

function removeItemFromList(list: Item[], id: number): Item[] {
    return list.filter((i) => {
        return i.id !== id;
    });
}

function updateItemDetails(list: Item[], id: number, editedItem: Item): Item[] {
    return list.map((i) => {
        if (i.id === id) {
            return editedItem;
        } else {
            return i;
        }
    });
}
