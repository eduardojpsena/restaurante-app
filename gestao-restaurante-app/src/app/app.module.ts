import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component';
import { PedidosModule } from './pedidos/pedidos.module';
import { PedidosService } from './shared/services/pedidos.service';
import { CardapioComponent } from './cardapio/cardapio.component';
import { CardapioFormComponent } from './cardapio/cardapio-form/cardapio-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardapioComponent,
    CardapioFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    PedidosModule,
    FormsModule
  ],
  providers: [
    PedidosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
