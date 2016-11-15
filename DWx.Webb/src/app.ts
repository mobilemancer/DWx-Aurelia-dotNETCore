import { autoinject } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';

@autoinject
export class App {

    configureRouter(config: RouterConfiguration, router: Router): void {
        config.title = 'Main';
        config.map([
            { route: ['', 'droids'], name: 'droids', moduleId: 'views/droids/droids-list', title: 'droids' }
        ]);
    }
}