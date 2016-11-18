import { autoinject } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';

@autoinject
export class App {
    public router: Router;

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;

        config.title = 'Droid Worx';
        config.map([
            { route: ['', 'home'], name: 'home', moduleId: 'views/home/index', title: 'Home', nav: 0 },
            { route: 'droids', name: 'droids', moduleId: 'views/droids/list', title: 'Droids', nav: 1 },
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
        ]);
        config.mapUnknownRoutes('views/home/index');
    }
}