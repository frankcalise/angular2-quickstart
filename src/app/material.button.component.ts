import { Component, Input } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';

@Component({
	selector: 'material-button',
	templateUrl: './app/material.button.tpl.html',
	directives: [MaterializeDirective]
})

export class MaterialButton {
	@Input() title: string;

	constructor() {
		
	}

	ngOnInit() {
		console.log('init material button..');
	}
}