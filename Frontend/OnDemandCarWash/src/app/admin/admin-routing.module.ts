import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { CustomersComponent } from '../customer/customers/customers.component';
import { CancelledOrdersComponent } from '../order/cancelled-orders/cancelled-orders.component';
import { CompletedOrdersComponent } from '../order/completed-orders/completed-orders.component';
import { OrdersComponent } from '../order/orders/orders.component';
import { PendingOrdersComponent } from '../order/pending-orders/pending-orders.component';
import { UnassignOrdersComponent } from '../order/unassign-orders/unassign-orders.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AssignWasherComponent } from '../washer/assign-washer/assign-washer.component';
import { WasherComponent } from '../washer/washer.component';
import { AddWashPackComponent } from './add-wash-pack/add-wash-pack.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { WallpaperComponent } from './wallpaper/wallpaper.component';

const routes: Routes = [
  { path:'admin', component:AdminDashBoardComponent,
  canActivate:[AuthGuard],
children:[
  {
    path:'homeview', component:WallpaperComponent
  },
{path:'home', component:HomeComponent,canActivate:[AuthGuard],},
{ path:'addWP', component: AddWashPackComponent,canActivate:[AuthGuard],},
{ path:'updateWp/:pack_id', component:EditComponent,canActivate:[AuthGuard],},
{ path:'orders', component:OrdersComponent,canActivate:[AuthGuard],},
{ path:'cancelled',component:CancelledOrdersComponent,canActivate:[AuthGuard],},
{ path:'pending',component:PendingOrdersComponent,canActivate:[AuthGuard],},
{ path:'unassigned',component:UnassignOrdersComponent,canActivate:[AuthGuard],},
{ path:'completed',component:CompletedOrdersComponent,canActivate:[AuthGuard],},
{path:'washers', component:WasherComponent,canActivate:[AuthGuard],},
{path:'customers',component:CustomersComponent,canActivate:[AuthGuard],},
{path:'assignwasher/:orderId',component:AssignWasherComponent,canActivate:[AuthGuard],}

]
  },
  { path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
export const routingComponents = [
  AdminDashBoardComponent
]
