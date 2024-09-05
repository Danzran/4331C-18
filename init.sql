CREATE DATABASE Contact_Manager;

CREATE USER IF NOT EXISTS ContactAPI IDENTIFIED BY 'apipass';

GRANT ALL ON *.* TO ContactAPI; 

USE Contact_Manager;

CREATE TABLE Logins
(
	ID INT NOT NULL AUTO_INCREMENT,
	DateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FirstName VARCHAR(50) NOT NULL DEFAULT '',
	LastName VARCHAR(50) NOT NULL DEFAULT '',
	Login VARCHAR(50) NOT NULL DEFAULT '',
	Password VARCHAR(50) NOT NULL DEFAULT '',
	PRIMARY KEY(ID)
);

CREATE TABLE Contacts
(
	ID INT NOT NULL AUTO_INCREMENT,
	FirstName VARCHAR(50) NOT NULL DEFAULT '',
	LastName VARCHAR(50) NOT NULL DEFAULT '',
	Email VARCHAR(50) NOT NULL DEFAULT '',
	Phone VARCHAR(50) NOT NULL DEFAULT '',
	Address VARCHAR(50) NOT NULL DEFAULT '',
	User_ID INT NOT NULL DEFAULT 0,
	PRIMARY KEY (ID),
	FOREIGN KEY (User_ID) REFERENCES Logins(ID)
);

INSERT INTO Logins(FirstName, LastName, Login, Password) VALUES("Joe", "Schmoe", "jsm0", "securepassword");
INSERT INTO Logins(FirstName, LastName, Login, Password) VALUES("Bobby", "Bo Bobbertson", "bobbybobo", "i<3trains");
INSERT INTO Logins(FirstName, LastName, Login, Password) VALUES("Bistian", "Biovanetti", "macrobialnine", "123abc");
-- INSERT INTO Logins(FirstName, LastName, Login, Password) VALUES(
-- INSERT INTO Logins(FirstName, LastName, Login, Password) VALUES(
-- INSERT INTO Logins(FirstName, LastName, Login, Password) VALUES(


INSERT INTO Contacts(FirstName, LastName, Email, Phone, Address, User_ID) VALUES("Jane", "Schmoe", "jane@theschmoes.com", "521-304-3949", "439 Wind Blossom Dr", 1);
INSERT INTO Contacts(FirstName, LastName, Email, Phone, User_ID) VALUES("Bobby", "Bo Bobbertson", "bobcubed@gmail.com", "439-493-3929", 1);
INSERT INTO Contacts(FirstName, LastName, Email, Phone, Address, User_ID) VALUES("George", "Marrison", "engineerman458@hotmail.com", "932-493-1929", "1939 East Blvd", 2);
INSERT INTO Contacts(FirstName, Email, Phone, User_ID) VALUES("The Beast", "thebeast@gmail.com", "111-222-1234", 2);
INSERT INTO Contacts(FirstName, LastName, Email, Phone, Address, User_ID) VALUES("Kai", "Oslow", "tornado@gmail.com", "(+5) 129-493-1929", "1020 Treehouse Lane", 3);
INSERT INTO Contacts(FirstName, LastName, Email, Phone, User_ID) VALUES("ajfiwj", "asjiowjfioj", "293i190idk9@eiocji.com", "493-965-4920", 3);