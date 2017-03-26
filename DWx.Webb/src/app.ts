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
            history.go(-3);
        }
    }

    private handleCallBackHash(hash: string) {

        let fragments = hash.split('&');
        fragments.forEach(element => {
            if (element.startsWith('#')) {
                element = element.substring(1);
            }

            if (element.startsWith("code=")) {
                StorageService.SetValue("code", element.substring(element.indexOf("code=") + "code=".length));
            }

            if (element.startsWith("id_token=")) {
                StorageService.SetValue("id_token", element.substring(element.indexOf("id_token=") + "id_token=".length));
            }

            if (element.startsWith("token=")) {
                StorageService.SetValue("token", element.substring(element.indexOf("token=") + "token=".length));
            }

            if (element.startsWith("access_token=")) {
                StorageService.SetValue("access_token", element.substring(element.indexOf("access_token=") + "access_token=".length));
            }

        });
    }

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;

        var step = new AuthorizeStep;
        config.addAuthorizeStep(step)

        config.title = 'Droid Worx';
        config.map([
            { route: ['', 'home'], name: 'home', moduleId: 'views/home/index', title: 'Home', nav: 1 },
            {
                route: 'droids', name: 'droids', moduleId: 'views/droids/list', title: 'Droids', nav: 2,
                settings: { auth: true }
            },
            {
                route: 'user', name: 'user', moduleId: 'views/user/index', title: 'USER', nav: 3,
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
            },
            {
                route: 'logout', name: 'logout', moduleId: 'views/home/logout', title: 'Logout', nav: 0
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
        if (StorageService.GetValue("access_token")) {
            return true;
        }
        return false;
    }
}