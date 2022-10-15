import { createAction, props } from "@ngrx/store";
import { Item } from "../item";

export const loadItems = createAction(
    "[Todo list] Fetch data from API",
    props<{ response: Item[] }>()
);

export const createItem = createAction(
    "[Todo list] Set new todo list item",
    props<{ response: Item }>()
);

export const deleteItem = createAction(
    "[Todo list] Delete todo item",
    props<{ id: number }>()
);

export const editItem = createAction(
    "[Todo list] Edit todo item",
    props<{ id: number; item: Item }>()
);
