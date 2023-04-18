import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule, routingComponents } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { AddWashPackComponent } from './add-wash-pack/add-wash-pack.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MaterialModule } from '../material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WallpaperComponent } from './wallpaper/wallpaper.component';

@NgModule({
  declarations: [
    routingComponents,
    HomeComponent,
    AddWashPackComponent,
    EditComponent,
    AdminDashBoardComponent,
    SideNavComponent,
    WallpaperComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class AdminModule { }
