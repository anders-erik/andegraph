
certsDir="./nginx/certs/"
mkdir -p "$certsDir"

# Generate a private key
openssl genpkey -algorithm RSA -out $certsDir/server.key

# Generate a certificate signing request (CSR)
openssl req -new -key $certsDir/server.key -out $certsDir/server.csr

# Generate a self-signed certificate
openssl x509 -req -days 365 -in $certsDir/server.csr -signkey $certsDir/server.key -out $certsDir/server.crt
