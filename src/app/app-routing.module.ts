import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./main-menu/home/home.component";
import {SceneComponent} from "./scene/scene.component";
import {MainMenuComponent} from "./main-menu/main-menu.component";

const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'game',
    component: SceneComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
