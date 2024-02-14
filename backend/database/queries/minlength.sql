ALTER TABLE userstable
ADD CONSTRAINT firstnamelen CHECK (LENGTH(firstname) >= 1);

ALTER TABLE userstable
ADD CONSTRAINT lastnamelen CHECK (LENGTH(lastname) >= 1);

ALTER TABLE userstable
ADD CONSTRAINT emaillen CHECK (LENGTH(email) >= 1);

ALTER TABLE userstable
ADD CONSTRAINT passwordlen CHECK (LENGTH(password) >= 8);

ALTER TABLE expenses 
ADD CONSTRAINT expenseNamelen CHECK (LENGTH(expenseName) >= 1);

ALTER TABLE expenses 
ADD CONSTRAINT expenseTypelen CHECK (LENGTH(expenseType) >= 1);

