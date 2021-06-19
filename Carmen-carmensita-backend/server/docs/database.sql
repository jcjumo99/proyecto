CREATE TABLE users(
    userId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(250),
    last_name VARCHAR(250),
    phone VARCHAR(250),
    country VARCHAR(250),
    city VARCHAR(250),
    address TEXT,
    email VARCHAR(250),
    password VARCHAR(250)
);

CREATE TABLE services(
    servicesId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(250),
    description TEXT,
    price VARCHAR(250),
    clothingId VARCHAR(250),
    image VARCHAR(250),
    createAt DATETIME
);

CREATE TABLE userServices(
    userId INT,
    servicesId INT,
    address TEXT,
    detail TEXT,
    type_delivery INT,
    state CHAR(1),
    deliveryId INT
);