import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as TasksActions from "./tasks.actions";
import {Item} from "../item/item";
import * as AppState from "../../app.state";

export interface State extends AppState.State {
    tasks: TasksState
}

export interface TasksState {
    items: Item[];
    error: string;
}

export const initialState: TasksState = {
    items: [],
    error: "",
};

export const tasksReducer = createReducer<TasksState>(
    initialState,
    on(TasksActions.loadItemsSuccess, (state, action): TasksState => ({
        ...state,
        items: action.items,
    })),
    on(TasksActions.loadItemsFailure, (state, action): TasksState => ({
        ...state,
        items: [],
        error: action.error
    })),
    on(TasksActions.createItemSuccess, (state, action): TasksState => ({
        ...state,
        items: state.items.concat(action.item),
    })),
    on(TasksActions.createItemFailure, (state, action): TasksState => ({
        ...state,
        error: action.error
    })),
    on(TasksActions.deleteItemSuccess, (state, action): TasksState => ({
        ...state,
        items: removeItemFromList(state.items, action.id),
    })),
    on(TasksActions.deleteItemFailure, (state, action): TasksState => ({
        ...state,
        error: action.error
    })),
    on(TasksActions.editItemSuccess, (state, action): TasksState => ({
        ...state,
        items: updateItemDetails(state.items, action.editedItem),
    })),
    on(TasksActions.editItemFailure, (state, action): TasksState => ({
        ...state,
        error: action.error
    }))
);

function removeItemFromList(list: Item[], id: number): Item[] {
    return list.filter((i) => {
        return i.id !== id;
    });
}

function updateItemDetails(list: Item[], editedItem: Item): Item[] {
    return list.map((i) => {
        if (i.id === editedItem.id) {
            return editedItem;
        } else {
            return i;
        }
    });
}

const getTasksFeatureState = createFeatureSelector<TasksState>('tasks');
export const getAllTasks = createSelector(
    getTasksFeatureState,
    (state) => state.items
);

export const getError = createSelector(
    getTasksFeatureState,
    (state) => state.error
);
