import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { MessageDisplayComponent } from './message-display/message-display.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageFormComponent,
    MessageDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
