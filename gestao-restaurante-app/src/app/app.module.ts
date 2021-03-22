import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component';
import { PedidosModule } from './pedidos/pedidos.module';
import { PedidosService } from './shared/services/pedidos.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    PedidosModule
  ],
  providers: [
    PedidosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
