openssl req -new -newkey rsa:1024 -nodes -keyout ca.key -x509 -days 500 -subj /C=RU/ST=SPb/L=SPb/O=GS-BIP/OU=GS/CN=192.168.109.50/emailAddress=glitchspeechtest@mail.ru -out ca.crt

openssl genrsa -des3 -out server.key 1024
openssl req -new -key server.key -out server.csr

openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt
openssl rsa -in server.key -out server.nopass.key
