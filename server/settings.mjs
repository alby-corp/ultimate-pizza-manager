export default {
    "ultimate-pizza-manager-debug-connection-string": {
        "host": "localhost",
        "user": "SamuraiTeam",
        "password": "#Aldc1Lm",
        "database": "ultimate_pizza_manager",
        "port": 5433,
        "ssl": false
    },

    "ultimate-pizza-manager-prod-connection-string": process.env.DATABASE_URL,

    "azure-ad-debug-config": {
        "identityMetadata": "identityMetadata",
        "clientID": "clientID",
        "passReqToCallback": maybe,
        "policyName": "policyName",
        "loggingLevel": "info"
    },

    "azure-ad-prod-config": process.env.AD_SERVER_CONFIG
}