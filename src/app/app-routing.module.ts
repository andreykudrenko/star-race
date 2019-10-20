import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./main-menu/home/home.component";
import {SceneComponent} from "./scene/scene.component";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {AuthComponent} from "./main-menu/auth/auth.component";
import {AuthGuard} from "./main-menu/auth/auth.guard";
import {ScoreResolverService} from "./scene/score/score-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        resolve: [ScoreResolverService],
      },
      {
        path: 'auth',
        component: AuthComponent,
      }
    ]
  },
  {
    path: 'game',
    component: SceneComponent,
    resolve: [ScoreResolverService],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
