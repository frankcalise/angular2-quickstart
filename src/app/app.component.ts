import { Component } from '@angular/core';
import { MaterialButton } from './material.button.component';

@Component({
	selector: 'my-app',
	templateUrl: './app/app.tpl.html',
	styleUrls: ['./dist/assets/css/all.css'],
	directives: [MaterialButton]
})

export class AppComponent {
	public buttonText: string = 'Click Me';

	constructor() {

	}

	myClickHandler(event) {
		console.log('button clicked');
	}
}