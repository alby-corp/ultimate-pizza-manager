import {Pipe} from "./pipe";
import {ActivatedRouteStep, ComponentBuilderStep, CurrentUriStep, HistoryStep} from "../steps";

export class NavigationPipe extends Pipe {
    constructor(config) {
        super(config, [CurrentUriStep, HistoryStep, ActivatedRouteStep, ComponentBuilderStep])
    }
}
