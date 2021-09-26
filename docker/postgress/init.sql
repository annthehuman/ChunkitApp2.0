CREATE USER chunkadmin WITH PASSWORD 'passchunkitappdb';

CREATE DATABASE chunk_db;
GRANT ALL PRIVILEGES ON DATABASE chunk_db TO chunkadmin;
