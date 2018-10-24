import {AlbyRoutingModule} from "./core/modules/alby-routing.module";
import {Route} from "./core";

import {
    CreatorComponent,
    ChatComponent,
    FormComponent,
    InfoComponent,
    MenuComponent,
    NotFoundComponent,
    OrdersComponent,
    SignedInComponent,
    UserComponent,
    LoginAdvisorComponent
} from "./components";
import {AuthGuard} from "./guards";

export const AppRoutingModule = (function () {

    const _routes = () => [
        new Route({
            path: '',
            component: FormComponent,
            canActivate: [AuthGuard],
        }),
        new Route({
            path: '',
            component: ChatComponent,
            outlet: 'chat-outlet'
        }),
        new Route({
            path: 'info',
            component: InfoComponent
        }),
        new Route({
            path: 'menu',
            component: MenuComponent
        }),
        new Route({
            path: 'week-orders',
            component: OrdersComponent,
            canActivate: [AuthGuard]
        }),
        new Route({
            path: 'login-requested',
            component: LoginAdvisorComponent,
        }),
        new Route({
            path: 'crea-la-tua-pizza',
            component: CreatorComponent,
            canActivate: [AuthGuard]
        }),
        new Route({
            path: 'signed-in',
            component: SignedInComponent,
        }),
        new Route({
            path: 'user',
            component: UserComponent
        }),
        new Route({
            path: '**',
            component: NotFoundComponent
        })
    ];

    return class extends AlbyRoutingModule {

        constructor() {
            super(_routes());
        }
    }
})();

