# Infrastructure

$env:POSTGRES_VERSION="10.2"

&docker-compose `
"-f" "docker-compose.yml" `
"-f" "postgreSQL\docker-compose.yml" `
$args
