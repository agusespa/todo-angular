import {createReducer, createSelector, on} from "@ngrx/store";
import * as TasksActions from "./tasks.actions";
import {Item} from "../item/item";
import * as AppState from "../../app.state";

export interface State extends AppState.State {
    tasks: TasksState
}

export interface TasksState {
    items: Item[];
}

export const initialState: TasksState = {
    items: [],
};

export const tasksReducer = createReducer<TasksState>(
    initialState,
    on(TasksActions.loadItems, (state, {response}) => ({
        ...state,
        items: response,
    })),
    on(TasksActions.createItem, (state, {response}) => ({
        ...state,
        items: state.items.concat(response),
    })),
    on(TasksActions.deleteItem, (state, {id}) => ({
        ...state,
        items: removeItemFromList(state.items, id),
    })),
    on(TasksActions.editItem, (state, {id, item}) => ({
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
