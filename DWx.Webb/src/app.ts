import { StorageService } from './utils/storageService';
import { autoinject } from 'aurelia-framework';
import { RouterConfiguration, Router, Redirect } from 'aurelia-router';

@autoinject
export class App {
    public router: Router;
    public frame: HTMLFrameElement;

    constructor() {
        //handle callback
        if (location.hash.includes("code=") || location.hash.includes("id_token=")) {
            var callback = location.hash;
            location.hash = "";
            this.handleCallBackHash(callback);
            history.go(-4);
        }
    }

    private handleCallBackHash(hash: string) {

        let fragments = hash.split('&');
        fragments.forEach(element => {
            if (element.includes("code=")) {
                StorageService.SetValue("code", element.substring(element.indexOf("code=") + "code=".length));
            }

            if (element.includes("id_token=")) {
                StorageService.SetValue("id_token", element.substring(element.indexOf("id_token=") + "id_token=".length));
            }

            if (element.includes("token=")) {
                StorageService.SetValue("token", element.substring(element.indexOf("token=") + "token=".length));
            }
        });
    }

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;

        var step = new AuthorizeStep;
        config.addAuthorizeStep(step)

        config.title = 'Droid Worx';
        config.map([
            { route: ['', 'home'], name: 'home', moduleId: 'views/home/index', title: 'Home', nav: 0 },
            {
                route: 'droids', name: 'droids', moduleId: 'views/droids/list', title: 'Droids', nav: 1,
                settings: { auth: true }
            },
            {
                route: 'user', name: 'user', moduleId: 'views/user/index', title: 'USER', nav: 2,
                settings: { auth: true }
            },
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
            {
                route: 'login', name: 'login', moduleId: 'views/home/login', nav: false
            }
        ]);
        config.mapUnknownRoutes('views/home/index');
    }
}

class AuthorizeStep {
    run(navigationInstruction, next) {
        if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
            // var isLoggedIn = 0;// insert magic here;
            if (!this.isLoggedIn()) {
                return next.cancel(new Redirect('login'));
            }
        }

        return next();
    }

    private isLoggedIn() {
        if (StorageService.GetValue("code")) {
            return true;
        }
        return false;
    }
}