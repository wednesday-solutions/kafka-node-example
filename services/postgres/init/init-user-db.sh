#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER reporting_dashboard_role WITH PASSWORD 'reportingdashboard123';
    CREATE DATABASE reporting_dashboard_dev;
    GRANT ALL PRIVILEGES ON DATABASE reporting_dashboard_dev TO reporting_dashboard_role;
EOSQL