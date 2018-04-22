// Navigation
link = async (page) => {

    switch (page) {
        case "menu":
            Helpers.populateContainer(await getMenuPage());
            break;
        case 'week-orders':
            Helpers.populateContainer(await getWeekOrdersPage());
            break;
        case 'info':
            Helpers.populateContainer(await getInfoPage());
            break;
        default:
            Helpers.populateContainer(await getOrdersPage());
    }
};








