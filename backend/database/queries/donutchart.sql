SELECT expenseType, 
SUM(expenseValue) AS totalValue, 
--This over function iterates over all categories
SUM(expenseValue) / SUM(SUM(expenseValue)) OVER () AS percentageValue,
EXTRACT(MONTH FROM MAX(expenseDate)) || '/' || EXTRACT(DAY FROM MAX(expenseDate)) as dmDate 
FROM expenses 
WHERE userEmail = 'user@gmail.com'
GROUP BY expenseType 
HAVING EXTRACT(MONTH FROM MAX(CURRENT_TIMESTAMP)) = EXTRACT(MONTH FROM MAX(expenseDate))
ORDER BY dmDate DESC
