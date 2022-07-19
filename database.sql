
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "role" INT DEFAULT 0
);

CREATE TABLE "areas" (
	"id" SERIAL PRIMARY KEY,
	"area" VARCHAR (100) UNIQUE NOT NULL,
	"gridX" VARCHAR (10),
	"gridY" VARCHAR (10),
	"station" VARCHAR (10),
	"office" VARCHAR (10)
);

CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY,
	"date" VARCHAR (10),
	"comment" VARCHAR (500),
	"user_id" INTEGER NOT NULL,
	"area_id" INTEGER NOT NULL
);

--Data for climbing areas. For base mode, users cannot create/update/delete areas, only comments
INSERT INTO areas (area, gridx, gridy, office, station) VALUES
	('Sawmill Creek Dome', '121', '99', 'DLH', 'KMYZ'),
	('Palisade Head', '119', '95', 'DLH', 'KTWM'),
	('Taylors Falls', '127', '91', 'MPX', 'KROS'),
	('Willow River', '126', '73', 'MPX', 'K21D'),
	('He Mni Can', '133', '52', 'MPX', 'KRGK'),
	('Devil''s Lake', '25', '79', 'MKX', 'KDLL'),
	('Sandstone', '67', '38', 'DLH', 'K04W');
	
--Dummy data to make sure comments show up correctly
INSERT INTO comments (date, comment, user_id, area_id) VALUES
	('3/16/2021', 'Hiked through waist deep snow on the way in. Needs a few more weeks to melt!', '1', '1'),
	('6/02/2021', 'Bugs are bad. Borfo the magnificent is itchy. Bring bug spray', '2', '1');
	('7/14/2022', 'Winter wall is blazing in the sun. Go to the shadyy side', '2', '5');
	
--GET all areas
SELECT * FROM areas ORDER BY "area" ASC;

--GET one area by ID
SELECT * FROM areas WHERE id=1;

--GET comments for one area and their associated user's name
SELECT comments.id, date, comment, user_id, area_id, username FROM comments 
	JOIN "user" ON comments.user_id="user".id
	WHERE area_id=1 ORDER BY comments.id DESC;

--DELETE a comment
DELETE FROM comments WHERE id=4 AND user_id=1;

--GET one comment by id, also get that area name
SELECT comments.id, date, comment, user_id, area, area_id FROM comments
	JOIN areas ON areas.id=comments.area_id
	WHERE comments.id=1;

--UPDATE comment by id
UPDATE comments SET 
	date='2021-03-16', 
	comment='Hiked through waist deep snow on the way in. Needs a few more weeks to melt?' 
	WHERE id=1;

--GET one area by id
SELECT * FROM areas WHERE id=1;