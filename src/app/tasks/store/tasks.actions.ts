import { createAction, props } from "@ngrx/store";
import { Item } from "../item/item";

export const loadItems = createAction(
    "[Tasks] Fetch data from API",
    props<{ response: Item[] }>()
);

export const createItem = createAction(
    "[Tasks] Set new todo list item",
    props<{ response: Item }>()
);

export const deleteItem = createAction(
    "[Tasks] Delete todo item",
    props<{ id: number }>()
);

export const editItem = createAction(
    "[Tasks] Edit todo item",
    props<{ item: Item }>()
);
