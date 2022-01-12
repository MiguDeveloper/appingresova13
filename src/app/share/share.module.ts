import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FooterComponent, NavbarComponent, SidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [FooterComponent, NavbarComponent, SidebarComponent],
})
export class ShareModule {}
