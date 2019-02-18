import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BdsPage } from './bds';

@NgModule({
  declarations: [
    BdsPage,
  ],
  imports: [
    IonicPageModule.forChild(BdsPage),
  ],
})
export class BdsPageModule {}
