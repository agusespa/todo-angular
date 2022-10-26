import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreModule} from '@ngrx/store';
import {TaskList} from "./task-list/task-list.component";
import {tasksReducer} from "./store/tasks.reducer";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {ItemComponent} from "./item/item.component";
import {EffectsModule} from "@ngrx/effects";
import {TasksEffects} from "./store/tasks.effects";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [TaskList, ItemComponent, SidebarComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature('tasks', tasksReducer),
        EffectsModule.forFeature([TasksEffects]),
        FormsModule
    ]
})
export class TasksModule {
}
