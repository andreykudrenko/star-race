import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SpaceshipComponent} from './scene/spaceship/spaceship.component';
import {AsteroidsGeneratorComponent} from "./scene/asteroids-generator/asteroids-generator.component";
import {AsteroidComponent} from "./scene/asteroids-generator/asteroid/asteroid.component";
import {SpaceshipService} from "./scene/spaceship/spaceship.service";
import {SceneComponent} from "./scene/scene.component";
import {SceneService} from "./scene/scene.service";
import {ScoreComponent} from "./scene/score/score.component";
import {ScoreService} from "./scene/score/score.service";
import {HomeComponent} from "./main-menu/home/home.component";
import {MainMenuComponent} from "./main-menu/main-menu.component";

@NgModule({
  declarations: [
    AppComponent,
    SpaceshipComponent,
    AsteroidsGeneratorComponent,
    AsteroidComponent,
    SceneComponent,
    ScoreComponent,
    HomeComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    SpaceshipService,
    SceneService,
    ScoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
