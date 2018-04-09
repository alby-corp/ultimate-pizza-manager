// Navigation
link = async (page, container) => {

    container.empty();

    let data;
    switch (page) {
        case "menu":
            data = await getMenuPage();
            Helpers.populateContainer(data, container);
            break;
        case 'week-orders':
            data = await getWeekOrdersPage();
            Helpers.populateContainer(data, container);
            break;
        case 'info':
            data = await getInfoPage();
            Helpers.populateContainer(data, container);
            break;
        default:
            data = await getOrdersPage();
            Helpers.populateContainer(data, container);
    }
};








