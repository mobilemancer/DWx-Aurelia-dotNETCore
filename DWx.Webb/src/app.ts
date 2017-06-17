import { StorageService } from './utils/storageService';
import { autoinject } from 'aurelia-framework';
import { RouterConfiguration, Router, Redirect } from 'aurelia-router';
import { TokenType } from "./enums/tokenType";

@autoinject
export class App {
    // public router: Router;
    public frame: HTMLFrameElement;

    constructor(private router: Router) {
        //handle callback
        if (location.hash.includes("code=") || location.hash.includes("id_token=")) {
            var callback = location.hash;
            location.hash = "";
            this.handleCallBackHash(callback);
            this.router.navigate('home');
        }
    }

    private handleCallBackHash(hash: string) {
        let fragments = hash.split('&');
        fragments.forEach(element => {
            if (element.startsWith('#')) {
                element = element.substring(1);
            }

            var token = this.extractToken(element);
            if (!!token) {
                StorageService.SetValue(token.key, token.value);
            }
        });
    }

    private extractToken(tokenFragment: string): { key: string, value: string } {
        if (tokenFragment.startsWith(TokenType[TokenType.code] + "=")) {
            return {
                key: TokenType[TokenType.code],
                value: tokenFragment.substring(tokenFragment.indexOf(TokenType[TokenType.code] + "=") + TokenType[TokenType.code].length + 1)
            };
        }

        if (tokenFragment.startsWith(TokenType[TokenType.id_token] + "=")) {
            return {
                key: TokenType[TokenType.id_token],
                value: tokenFragment.substring(tokenFragment.indexOf(TokenType[TokenType.id_token] + "=") + TokenType[TokenType.id_token].length + 1)
            };
        }

        if (tokenFragment.startsWith(TokenType[TokenType.token] + "=")) {
            return {
                key: TokenType[TokenType.token],
                value: tokenFragment.substring(tokenFragment.indexOf(TokenType[TokenType.token] + "=") + TokenType[TokenType.token].length + 1)
            };
        }

        if (tokenFragment.startsWith(TokenType[TokenType.access_token] + "=")) {
            return {
                key: TokenType[TokenType.access_token],
                value: tokenFragment.substring(tokenFragment.indexOf(TokenType[TokenType.access_token] + "=") + TokenType[TokenType.access_token].length + 1)
            };
        }
    }

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;

        var step = new AuthorizeStep;
        config.addAuthorizeStep(step)

        config.title = 'Droid Worx';
        config.map([
            { route: ['', 'home'], name: 'home', moduleId: 'views/home/index', title: 'Home', nav: false },
            {
                route: 'droids', name: 'droids', moduleId: 'views/droids/list', title: 'Droids', nav: 2,
                settings: { auth: false }
            },
            // {
            //     route: 'user', name: 'user', moduleId: 'views/user/index', title: 'USER', nav: 3,
            //     settings: { auth: true }
            // },
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
            // {
            //     route: 'logout', name: 'logout', moduleId: 'views/home/logout', title: 'Logout', nav: 0
            // }

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