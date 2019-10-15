import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SpaceshipComponent} from './spaceship/spaceship.component';
import {AsteroidsComponent} from "./asteroids/asteroids.component";
import {AsteroidComponent} from "./asteroids/asteroid/asteroid.component";
import {SpaceshipService} from "./spaceship/spaceship.service";

@NgModule({
  declarations: [
    AppComponent,
    SpaceshipComponent,
    AsteroidsComponent,
    AsteroidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    SpaceshipService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
