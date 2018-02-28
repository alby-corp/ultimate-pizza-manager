// Navigation
link = (page, container) => {
    container.empty();

    switch (page) {
        case "menu":
            getMenuPage().then(data => Helpers.populateContainer(data, container));
            break;
        case 'week-orders':
            getWeekOrdersPage().then(data => Helpers.populateContainer(data, container));
            break;
        default:
            getOrdersPage().then(data => Helpers.populateContainer(data, container));
    }
};
