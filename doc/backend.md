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

### /login **(POST)** 
*authentication required*

#### Params:

- name: string
- description (optional): string 
- type: string
- valor: double/numeric
- date (optional): date

#### Responses

- 200:
```
{ "msg": "expenses sent successfully" } 
```
- 500:
```
{ msg: "postgres error" }

## API Architecture 

On this project, it's gonna be used the MVC architecture.

## Setup

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

#Generate certificate signing request
openssl req -new -key ./backend/SSL/ssl.key -out ./backend/SSL/m4n.csr

#Generate self-signed crt
openssl req -x509 -new -nodes -key ./backend/SSL/ssl.key -sha256 -days 365 -out ./backend/SSL/m4n.crt
```

## References 

[HTTPS](https://www.cloudflare.com/pt-br/learning/ssl/what-is-https/)

[Creating self-signed SSL certificates](https://linuxize.com/post/creating-a-self-signed-ssl-certificate/)