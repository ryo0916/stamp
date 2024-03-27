CREATE DATABASE stamp;
USE stamp;

CREATE TABLE users (
  user_id INT(11) NOT NULL AUTO_INCREMENT,
  name  VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE markers (
  marker_id INT(11) NOT NULL AUTO_INCREMENT,
  map_id INT(11) NOT NULL,
  title VARCHAR(255) NOT NULL,
  comment TEXT,
  latitude DECIMAL(12,9) NOT NULL,
  longitude DECIMAL(12,9) NOT NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (marker_id)
);

CREATE TABLE maps (
  map_id INT(11) NOT NULL AUTO_INCREMENT,
  map_name VARCHAR(255) NOT NULL,
  user_id INT(11) NOT NULL,
  latitude DECIMAL(12,9) NOT NULL,
  longitude DECIMAL(12,9) NOT NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (map_id)
);

CREATE TABLE comments (
  comment_id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11),
  comment TEXT  NOT NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (comment_id)
);