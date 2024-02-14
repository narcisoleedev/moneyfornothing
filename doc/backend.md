## Dev log

#### Generating SSL certificates/ Gerando certificados SSL

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


### References 

[HTTPS](https://www.cloudflare.com/pt-br/learning/ssl/what-is-https/)
[Genereting self-signed ssl certificates/Gerando certificados ssl auto-assinados](https://linuxize.com/post/creating-a-self-signed-ssl-certificate/)