import { autoinject } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';

@autoinject
export class App {

    configureRouter(config: RouterConfiguration, router: Router): void {
        config.title = 'Main';
        config.map([
            { route: [''], name: 'home', moduleId: 'views/home/index', title: 'Home' },
            { route: ['droids'], name: 'droids', moduleId: 'views/droids/droids-list', title: 'Droids', nav: 0 },
            {
                route: 'droids/:id',
                name: 'droidInfo',
                moduleId: 'views/droids/detail',
                title: 'Droid Info',
                nav: false
            },
            {
                route: 'droids/:id/delete',
                name: 'droidRemove',
                moduleId: 'views/droids/delete',
                title: 'Delete Droid',
                nav: false
            },
            // { route: ['droids/:id/delete'], name: 'droidsRemove', moduleId: 'views/droids/delete', title: 'Delete Droid', nav:2 }
        ]);
    }
}