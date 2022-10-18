import {Item} from "./item/item";

export function getActiveItems(items: Item[]): Item[] {
    return items.filter((i) => i.done === false);
}

export function getCompletedItems(items: Item[]): Item[] {
    return items.filter((i) => i.done === true);
}

export function getTodaysItems(items: Item[]): Item[] {
    const currentDate = new Date();
    return items.filter(
        (i) =>
            i.done === false &&
            i.dueDate !== null &&
            i.dueDate !== undefined &&
            new Date(i.dueDate).setHours(0, 0, 0, 0) ===
            currentDate.setHours(0, 0, 0, 0)
    );
}

export function getOverdueItems(items: Item[]): Item[] {
    const currentDate = new Date();
    return items.filter(
        (i) =>
            i.done === false &&
            i.dueDate !== null &&
            i.dueDate !== undefined &&
            new Date(i.dueDate).setHours(0, 0, 0, 0) <
            currentDate.setHours(0, 0, 0, 0)
    );
}
