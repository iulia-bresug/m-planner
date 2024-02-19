import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PlannerComponent} from "./components/planner/planner.component";
import {PlayerComponent} from "./components/player/player.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'planner',
        component: PlannerComponent,
    },
    {
        path: 'player',
        component: PlayerComponent,
    },
];
