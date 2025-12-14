#!/bin/bash

# sh run-dev.sh

# Sair do script caso ocorra algum erro
set -e

if [ ! -f .env ]; then
  exists_env_file="false"
  cp .env.example .env
else
  exists_env_file="true"
fi

docker compose up -d --force-recreate --remove-orphans --build

wait_for_app() {
  echo "Aguardando o Laravel estar pronto..."
  while ! docker exec noteeditor-app php artisan migrate:status > /dev/null 2>&1; do
    sleep 3
  done
  echo "Laravel está pronto!"
}

wait_for_app

if [ "$exists_env_file" = "false" ]; then
  docker exec noteeditor-app php artisan key:generate
fi

docker exec noteeditor-app php artisan migrate --force
docker exec noteeditor-app php artisan db:seed --force
docker exec noteeditor-app php artisan storage:link
docker exec noteeditor-app php artisan queue:restart
docker exec noteeditor-app npm install
