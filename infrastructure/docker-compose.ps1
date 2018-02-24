$env:POSTGRES_VERSION="10.0"

&docker-compose `
"-f" "docker-compose.yml" `
"-f" "postgres\docker-compose.yml" `
$args
