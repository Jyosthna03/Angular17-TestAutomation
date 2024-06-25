import { Component } from '@angular/core';
import { BankingdataService } from '../../../bankingdata.service';
import { NgClass, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass,NgStyle,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private service: BankingdataService,private route:Router) {}

  UserSelectTab:string = this.service.userSelectedTab;
  userName:string = ''

  ngOnInit(){
    this.userName = this.service.trimmedString;
  }

  selectTab(name: string) {
    this.service.breadCrumb.pop();
    this.service.breadCrumb.push(name);
    this.UserSelectTab = name;
  }
 
  OnLogOut(){
     localStorage.removeItem('logindata')
  }
  

}
