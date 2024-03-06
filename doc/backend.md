## Running

To run the API, follow these steps:

```
git clone https://github.com/narcisoleedev/moneyfornothing
npm i

#Set your postgresql environment, creating the tables as in the database/queries sql queries

npm run backend-run
```

## Endpoints

### /login **(POST)**

#### Params:

- email: string
- password: string

#### Responses

- 200:
```
{ "token": "<jwt token here>" } 
```
- 401 (user not found):
```
{ msg: "user not found" };
```

- 401 (wrong password):
```
{ msg: "wrong password" }
```

- 500:
```
{ msg: "postgres error" }
```

### /signup **(POST)**

#### Params:

- email: string
- password: string
- firstname: string
- fullname: string

#### Responses

- 201:
```
{ "msg": "created user successfully" } 
```
- 500:
```
{ msg: "postgres error" }
```

### /home **(GET)**
*authentication required*

#### Responses

- 200:
```
data = {
    expensetype: [],
    totaValuel: [],
    percentageValue: [],
    dmdate: [],
    };
```
- 500:
```
{ msg: "postgres error" }
```

### /expenses **(GET)**
*authentication required*

#### Responses

- 200:
```
expenses = {
    expenseName: [],
    expenseDescription: [],
    expenseType: [],
    expenseValue: [],
    expenseDate: [],
    }
```
- 500:
```
{ msg: "postgres error" }
```

### /expenses **(POST)** 
*authentication required*

#### Params:

- name: string
- description (optional): string 
- type: string
- value: double/numeric
- date (optional): date

#### Responses

- 200:
```
{ "msg": "expenses sent successfully" } 
```
- 500:
```
{ msg: "postgres error" }
```

### /incomes **(GET)**
*authentication required*

#### Responses

- 200:
```
incomess = {
    incomeName: [],
    incomeDescription: [],
    incomeType: [],
    incomeValue: [],
    incomeLiquidity: [],
    incomeFrequency: [],
    incomeStartDate: [],
    }
```
- 500:
```
{ msg: "postgres error" }
```

### /incomes **(POST)** 
*authentication required*

#### Params:

- name: string
- description (optional): string 
- type: string
- value: double/numeric
- liquidity: float/numeric
- frequency: string
- startDate (optional): date

#### Responses

- 200:
```
{ "msg": "incomes sent successfully" } 
```
- 500:
```
{ msg: "postgres error" }
```

## API Architecture 

On this project, it's gonna be used the MVC architecture.

## Setup

### PostgreSQL setup

```
sudo pacman -S postgresql
systemctl start postgresql
systemctl enable postgresql
su psql
initdb --locale=C.UTF-8 --encoding=UTF8 -D /var/lib/postgres/data --data-checksums
createuser --interactive
\q
su psql -d <db> -U <user> - f<sql_file>
#do the previous command for the queries in this order:
usersTable.sql
expenses.sql
incomes.sql
minlenght.sql
```

### Generating ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET

To generate both tokens secrets that will be used on this application use:
```
require('crypto').randomBytes(64).toString('hex');
```
after that insert its on your .env file.

### Generating SSL certificates/ Gerando certificados SSL

```
sudo pacman -S openssl
openssl req -newkey rsa:4096 \
    -x509 \
    -sha256 \
    -days 365 \
    -nodes \
    -out example.crt \
    -keyout ./backend/SSL/ssl.key

#or

openssl req -newkey rsa:4096 \
    -x509 \
    -sha256 \
    -days 365 \
    -nodes \
    -out example.crt \
    -keyout ./backend/SSL/ssl.key \
    -config ./backend/SSL/ssl.conf

#Generate certificate signing request
openssl req -new -key ./backend/SSL/ssl.key -out ./backend/SSL/m4n.csr

#Generate self-signed crt
openssl req -x509 -new -nodes -key ./backend/SSL/ssl.key -sha256 -days 365 -out ./backend/SSL/m4n.crt
```

## References 

[HTTPS](https://www.cloudflare.com/pt-br/learning/ssl/what-is-https/)

[Creating self-signed SSL certificates](https://linuxize.com/post/creating-a-self-signed-ssl-certificate/)

[where to store JWT](https://stackoverflow.com/questions/27067251/where-to-store-jwt-in-browser-how-to-protect-against-csrf)