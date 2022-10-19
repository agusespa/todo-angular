import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as TasksActions from "./tasks.actions";
import {Item} from "../item/item";
import * as AppState from "../../app.state";
import * as TasksUtils from "../tasks.utils";
import {filter} from "rxjs";

export interface State extends AppState.State {
    tasks: TasksState
}

export interface TasksState {
    items: Item[];
    filter: string;
    error: string;
}

export const initialState: TasksState = {
    items: [],
    filter: "all",
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
    })),
    on(TasksActions.setActiveFilter, (state, action): TasksState => ({
        ...state,
        filter: action.filter
    })),
    on(TasksActions.deleteError, (state): TasksState => ({
        ...state,
        error: ''
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

export const getError = createSelector(
    getTasksFeatureState,
    (state) => state.error
);

export const getFilter = createSelector(
    getTasksFeatureState,
    (state) => state.filter
);

function filterItems(items: Item[], filter: string): Item[] {
    if (filter === "active") return TasksUtils.getActiveItems(items);
    else if (filter === "completed")
        return TasksUtils.getCompletedItems(items);
    else if (filter === "today") {
        return TasksUtils.getTodaysItems(items);
    } else if (filter === "overdue") {
        return TasksUtils.getOverdueItems(items);
    } else return items;
}

export const getTasks = createSelector(
    getTasksFeatureState,
    (state) => filterItems(state.items, state.filter)
);

export const getAllTasks = createSelector(
    getTasksFeatureState,
    (state) => state.items
);
export const getActiveTasks = createSelector(
    getTasksFeatureState,
    (state) => filterItems(state.items, "active")
);
export const getTodaysTasks = createSelector(
    getTasksFeatureState,
    (state) => filterItems(state.items, "today")
);
export const getCompletedTasks = createSelector(
    getTasksFeatureState,
    (state) => filterItems(state.items, "completed")
);
export const getOverdueTasks = createSelector(
    getTasksFeatureState,
    (state) => filterItems(state.items, "overdue")
);
