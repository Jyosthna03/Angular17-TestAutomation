import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../dashboard/account-details/navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pagenotfound',
    standalone: true,
    templateUrl: './pagenotfound.component.html',
    styleUrl: './pagenotfound.component.css',
    imports: [NavbarComponent,RouterLink]
})

export class PageNotFoundComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}