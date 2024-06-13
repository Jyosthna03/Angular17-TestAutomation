import { Component, OnInit } from '@angular/core';

@Component({
template:`
<div class="bg-danger text-warning">
    <h2>404 - page Not found</h2>
    <p>The page you are searching is not found</p>
</div>`
})

export class PageNotFoundComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}