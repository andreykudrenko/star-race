import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SpaceshipComponent} from './spaceship/spaceship.component';
import {AsteroidsGeneratorComponent} from "./asteroids-generator/asteroids-generator.component";
import {AsteroidComponent} from "./asteroids-generator/asteroid/asteroid.component";
import {SpaceshipService} from "./spaceship/spaceship.service";
import {SceneComponent} from "./scene/scene.component";
import {SceneService} from "./scene/scene.service";
import {ScoreComponent} from "./scene/score/score.component";
import {ScoreService} from "./scene/score/score.service";
import {HomeComponent} from "./home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    SpaceshipComponent,
    AsteroidsGeneratorComponent,
    AsteroidComponent,
    SceneComponent,
    ScoreComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    SpaceshipService,
    SceneService,
    ScoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
