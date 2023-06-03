# syntax=docker/dockerfile:1

FROM postgres

ADD tables/ docker-entrypoint-initdb.d/tables/
ADD mock/ docker-entrypoint-initdb.d/mock/
ADD deploy_schemas.sql docker-entrypoint-initdb.d
