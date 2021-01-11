#!/usr/local/bin/zsh

dropdb -U node_user dragonstackdb
createdb -U node_user dragonstackdb

echo "🚚 Configuring dragonstackdb"

psql -U node_user dragonstackdb < ./bin/sql/generation.sql
psql -U node_user dragonstackdb < ./bin/sql/dragon.sql

echo "🍺 dragonstackdb configured"