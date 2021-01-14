DROP DATABASE IF EXISTS checkpoint_3;

CREATE DATABASE checkpoint_3;

USE checkpoint_3;

CREATE TABLE `album` (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR (255) NOT NULL,
  genre VARCHAR (255) NOT NULL,
  picture VARCHAR(256) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE `track` (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_album INT NOT NULL,
  title VARCHAR (128) NOT NULL,
  youtube_url VARCHAR (255) NOT NULL,
  FOREIGN KEY (id_album) REFERENCES album (id) ON
DELETE CASCADE
);