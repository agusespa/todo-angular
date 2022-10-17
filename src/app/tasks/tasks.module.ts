import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreModule} from '@ngrx/store';
import {TaskList} from "./task-list/task-list.component";
import {tasksReducer} from "./store/tasks.reducer";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {ItemComponent} from "./item/item.component";


@NgModule({
    declarations: [TaskList, ItemComponent, SidebarComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature('tasks', tasksReducer)
    ]
})
export class TasksModule {
}
