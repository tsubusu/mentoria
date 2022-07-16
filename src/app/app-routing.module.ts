import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';
import { LoginGuard } from './autenticacao/login.guard';

const routes: Routes = [
  {
    path: 'acessibilidade', loadChildren: () => import('./design-acessibilidade/design-acessibilidade.module').then((m) => m.DesignAcessibilidadeModule),
  },
  {
    path: 'acessibilidade2', loadChildren: () => import('./design-acessibilidade2/design-acessibilidade2.module').then((m) => m.DesignAcessibilidade2Module),
  },
  {
    path:'home',
    pathMatch:'full', //retira os espacos em branco
    redirectTo: 'home'
  },
  {
    path:'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canLoad: [LoginGuard]
  },
  {
    path:'animais', loadChildren: () => import('./animais/animais.module').then((m) => m.AnimaisModule),
    canLoad: [AutenticacaoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
