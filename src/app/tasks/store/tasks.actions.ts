import { createAction, props } from "@ngrx/store";
import { Item } from "../item/item";
import {ItemDto} from "../item/itemDto";

export const loadItems = createAction(
    "[Tasks] Fetch data from API"
);
export const loadItemsSuccess = createAction(
    "[Tasks] Fetch data from API Success",
    props<{ items: Item[] }>()
);
export const loadItemsFailure = createAction(
    "[Tasks] Fetch data from API Fail",
    props<{ error: string }>()
);

export const createItem = createAction(
    "[Tasks] New item",
    props<{ itemDto: ItemDto }>()
);
export const createItemSuccess = createAction(
    "[Tasks] New Item Success",
    props<{ item: Item }>()
);
export const createItemFailure = createAction(
    "[Tasks] New Item Fail",
    props<{ error: string }>()
);

export const deleteItem = createAction(
    "[Tasks] Delete Task",
    props<{ id: number }>()
);
export const deleteItemSuccess = createAction(
    '[Tasks] Delete Task Success',
    props<{ id: number }>()
);
export const deleteItemFailure = createAction(
    '[Tasks] Delete Task Failure',
    props<{ error: string }>()
);

export const editItem = createAction(
    "[Tasks] Edit todo item",
    props<{ editedItem: Item }>()
);
export const editItemSuccess = createAction(
    '[Tasks] Edit item Success',
    props<{ editedItem: Item }>()
);
export const editItemFailure = createAction(
    '[Tasks] Edit item Failure',
    props<{ error: string }>()
);

export const setActiveFilter = createAction(
    '[Tasks] Set active filter',
    props<{ filter: string }>()
);