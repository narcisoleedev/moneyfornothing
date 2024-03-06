CREATE TABLE incomes(
    id SERIAL PRIMARY KEY NOT NULL,
    incomeName VARCHAR(50) NOT NULL,
    incomeDescription VARCHAR(500),
    incomeType VARCHAR(30) NOT NULL,
    incomeValue NUMERIC(15,2) NOT NULL,
    incomeLiquidity FLOAT,
    --Frequency in string format for better understanding
    incomeFrequency VARCHAR(5),
    incomeStartDate TIMESTAMP NOT NULL,
    userEmail VARCHAR(50) NOT NULL,
    CONSTRAINT fk_userEmail FOREIGN KEY(userEmail)
        REFERENCES userstable(email)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);