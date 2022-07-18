import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login/login.component';
import { HomeComponent } from './modules/home/home/home.component'
import { AuthGuard } from './modules/login/services/guards/auth.guard';
import { MenuComponent } from './layout/menu/menu.component';
import { LoginGuard } from './modules/login/services/guards/login.guard';
import { CorreosComponent } from './modules/correos/correos/correos.component';
import { ArchivosComponent } from './modules/archivos/archivos/archivos.component';
import { MainComponent } from './modules/main/main.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent
  },

  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    component: MenuComponent,
    canActivateChild:[LoginGuard],
    children:[
      {
        path:'home',
        component: HomeComponent
      },
      {
        path:'correo',
        component: CorreosComponent
      },
      {
        path: 'archivo',
        component: ArchivosComponent
      }
    ]
   
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
