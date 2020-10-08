CREATE DATABASE movie-world;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE public.movies (
	id bigserial NOT NULL,
	title varchar(50) NOT NULL,
	release_date varchar(10) NOT NULL,
	genre varchar(50) NOT NULL,
	plot text NOT NULL,
	CONSTRAINT movies_pk PRIMARY KEY (id)
);


CREATE TABLE public.reviews (
	id bigserial NOT NULL,
	movie_id int8 NULL,
	rating int4 NOT NULL,
	review text NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT ratings_pkey PRIMARY KEY (id),
	CONSTRAINT ratings_rating_check CHECK (((rating >= 1) AND (rating <= 5))),
	CONSTRAINT reviews_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);



CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);





