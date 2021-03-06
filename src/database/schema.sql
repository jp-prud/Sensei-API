CREATE DATABASE mydashboard;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS stores (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS plans (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL UNIQUE,
  description VARCHAR NOT NULL,
  price VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS clients (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  phone VARCHAR,
  store_id UUID,
  plan_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(store_id) REFERENCES stores(id),
  FOREIGN KEY(plan_id) REFERENCES plans(id)
);
