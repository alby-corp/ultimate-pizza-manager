import {Container} from "../core/container";
import {AuthService, ModalService, ResourceService} from "../services";
import {
    ChatComponent,
    CreatorComponent,
    FormComponent,
    InfoComponent, LoginAdvisorComponent,
    MenuComponent, NotFoundComponent,
    OrdersComponent, SignedInComponent,
    UserComponent
} from "../components";

Object.defineProperty(Container.prototype, "initComponents", {
    value: function () {
        const commonServices = [ResourceService, ModalService];

        this.singleton(FormComponent, commonServices);
        this.singleton(InfoComponent, commonServices);
        this.singleton(MenuComponent, commonServices);
        this.singleton(UserComponent, commonServices);
        this.singleton(OrdersComponent, commonServices);
        this.singleton(CreatorComponent, commonServices);
        this.singleton(ChatComponent, []);
        this.singleton(SignedInComponent, [AuthService, ModalService]);
        this.singleton(LoginAdvisorComponent, [AuthService]);
        this.singleton(NotFoundComponent, []);
    }
});
