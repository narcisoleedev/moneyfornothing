CREATE TABLE expenses(
    id SERIAL PRIMARY KEY NOT NULL,
    expenseName VARCHAR(50) NOT NULL, 
    expenseDescription VARCHAR(500),
    expenseType VARCHAR(30) NOT NULL,
    expenseValue NUMERIC(12, 2) NOT NULL,
    expenseDate TIMESTAMP NOT NULL,
    userEmail VARCHAR(100) NOT NULL,
    CONSTRAINT fk_userEmail FOREIGN KEY (userEmail)
        REFERENCES usersTable(email)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);