import { Component, signal } from '@angular/core';
import { BankingdataService } from '../../../../../bankingdata.service';
import { recent } from '../../../../../modal';
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-recent-transaction',
  standalone: true,
  imports: [CurrencyPipe,NgFor],
  templateUrl: './recent-transaction.component.html',
  styleUrl: './recent-transaction.component.css'
})
export class RecentTransactionComponent {
  constructor(private serv:BankingdataService){}
  RecentTrans!:recent[];
  recentTrans = signal(this.RecentTrans);
  
  ngOnInit(){
    this.showTabData();
    // this.dropdownWork();
  }
  
  showTabData(){
    this.serv.getData().subscribe((data:any)=>{
      if(data['RecentTrans'].length!=0){
        this.recentTrans.set(data['RecentTrans']);
        console.log(this.recentTrans());
      }
    });
  }

  // dropdownWork(){
  //   const dropdown = document.querySelectorAll('.dropdown');
  //   dropdown.forEach(dropdown=>{
  //     const select = dropdown.querySelector('.select');
  //     const caret = dropdown.querySelector('.caret');
  //     const menu = dropdown.querySelector('.menu');
  //     const options = dropdown.querySelectorAll('.menu li');
  //     const selected = dropdown.querySelector('.selected');

  //     select?.addEventListener('click',()=>{
  //       select.classList.toggle('select-clicked');
  //       caret?.classList.toggle('caret-rotate');
  //       menu?.classList.toggle('menu-open');
  //     });

  //     options.forEach(option=>{
  //       option.addEventListener('click',()=>{
  //         selected?.innerHTML = option.innerHTML;
  //         select?.classList.remove('select-clicked');
  //         caret?.classList.remove('caret-rotate');
  //         menu?.classList.remove('menu-open');
  //         options.forEach(option=>{
  //           option.classList.remove('active');
  //         });
  //         option.classList.add('active')
  //       })
  //     })
  //   }


  //   )
  // }

  // dropdownWork(){
  //   const dropdowns = document.querySelectorAll('.dropdown');
  //   dropdowns.forEach(dropdown=>{
  //     const select = dropdown.querySelector('.select');
  //     const caret = dropdown.querySelector('.caret');
  //     const menu = dropdown.querySelector('.menu');
  //     const options = dropdown.querySelectorAll('.menu li');
  //     const selected = dropdown.querySelector('.selected');
  
  //     if (select && caret && menu && options.length > 0 && selected) { // Check if all required elements are found
  //       select.addEventListener('click',()=>{
  //         select.classList.toggle('select-clicked');
  //         caret.classList.toggle('caret-rotate'); // Remove optional chaining as you're sure caret exists
  //         menu.classList.toggle('menu-open');
  //       });
  
  //       options.forEach(option=>{
  //         option.addEventListener('click',()=>{
  //           selected.innerHTML = option.innerHTML;
  //           select.classList.remove('select-clicked');
  //           caret.classList.remove('caret-rotate');
  //           menu.classList.remove('menu-open');
  //           options.forEach(option=>{
  //             option.classList.remove('active');
  //           });
  //           option.classList.add('active');
  //         });
  //       });
  //     }
  //   });
  // }
  

  

  
  
} 
