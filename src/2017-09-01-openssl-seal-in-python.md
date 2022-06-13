===========================================================================
categories: 'web'
date: 2017-09-01 14:35
description: ''
icon: ''
ogimage: ''
script: ''
style: ''
template: post.html
title: !!python/unicode 'openssl_seal in Python'
===========================================================================

When life gives you lemons, you make lemonade, no surprise there, but what about when life gives you a X509 certificate, some PHP code and you have to encrypt XMLs with the public key to integrate a payment provider? <!--more-->


//code text
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            04:00:00:00:00:01:15:4b:5a:c3:94
    Signature Algorithm: sha1WithRSAEncryption
        Issuer: C=BE, O=GlobalSign nv-sa, OU=Root CA, CN=GlobalSign Root CA
        Validity
            Not Before: Sep  1 12:00:00 1998 GMT
            Not After : Jan 28 12:00:00 2028 GMT
        Subject: C=BE, O=GlobalSign nv-sa, OU=Root CA, CN=GlobalSign Root CA
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:da:0e:e6:99:8d:ce:a3:e3:4f:8a:7e:fb:f1:8b:
                    ...
                Exponent: 65537 (0x10001)
        X509v3 extensions:
            X509v3 Key Usage: critical
                Certificate Sign, CRL Sign
            X509v3 Basic Constraints: critical
                CA:TRUE
            X509v3 Subject Key Identifier:
                60:7B:66:1A:45:0D:97:CA:89:50:2F:7D:04:CD:34:A8:FF:FC:FD:4B
    Signature Algorithm: sha1WithRSAEncryption
         d6:73:e7:7c:4f:76:d0:8d:bf:ec:ba:a2:be:34:c5:28:32:b5:
         d6:73:e7:7c:4f:76:d0:8d:bf:ec:ba:a2:be:34:c5:28:32:b5:
         d6:73:e7:7c:4f:76:d0:8d:bf:ec:ba:a2:be:34:c5:28:32:b5:
         d6:73:e7:7c:4f:76:d0:8d:bf:ec:ba:a2:be:34:c5:28:32:b5:
         d6:73:e7:7c:4f:76:d0:8d:bf:ec:ba:a2:be:34:c5:28:32:b5:
         d6:73:e7:7c:4f:76:d0:8d:bf:ec:ba:a2:be:34:c5:28:32:b5:
         d6:73:e7:7c:4f:76:d0:8d:bf:ec:ba:a2:be:34:c5:28:32:b5:
         d6:73:e7:7c:4f:76:d0:8d:bf:ec:ba:a2:be:34:c5:28:32:b5:
         d6:73:e7
-----BEGIN CERTIFICATE-----
WaJTqDxwWW2KQNvASMh2EXGk14y7YgRr46cLs5Y5l3gaFS4pyGhNCFKTHp/TC1ht
TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1
IHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBh
dGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0
dGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0
dWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBl
MjZaMIGxMQswCQYDVQQGEwJSTzESMBAGA1UECAwJQnVjaGFyZXN0MRIwEAYDVQQH
dWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBl
DAlCdWNoYXJlc3QxFzAVBgNVBAoMDk4gRSBUIE8gUCBJIEEgMScwJQYDVQQLDB5O
IEUgVCBPIFAgSSBBIERldmVsb3BtZW50IFRlYW0xFDASBgNVBAMMC21vYmlscGF5
LnJvMSIwIAYJKoZIhvcNAQkBFhNzdXBwb3J0QG1vYmlscGF5LnJvMIGfMA0GCSqG
TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1
SIb3DQEBAQUAA4GNADCBiQKBgQC8IdPzYRKWRbir4IWfTe+Ql22tOTFjQoeNtpHH
xSm6j+WFYglAYNzHOWWHdXtF4vVItUCNmf4773Iaw2RkMI2qwKa90vW6MBxJGR/N
WaJTqDxwWW2KQNvASMh2EXGk14y7YgRr46cLs5Y5l3gaFS4pyGhNCFKTHp/TC1ht
MjZaMIGxMQswCQYDVQQGEwJSTzESMBAGA1UECAwJQnVjaGFyZXN0MRIwEAYDVQQH
ZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=
-----END CERTIFICATE-----
//code


//code php
<?php

$publicKey  = openssl_pkey_get_public("/path/to/certificate.cer");
$srcData    = $this->_xmlDoc->saveXML();
$publicKeys = array($publicKey);
$encData    = null;
$envKeys    = null;
$result     = openssl_seal($srcData, $encData, $envKeys, $publicKeys);

?>
//code


According to this <a href="https://web.archive.org/web/20150928173147/http://blog.local.ch:80/en/2007/10/29/openssl-php-to-java/" target="_blank">blog post</a> what openssl_seal does is:

1. Extract the public_key from the certificate
2. Generate a 128 bits (16 bytes) long random_key (this will be used to encrypt the message using a symmetrical algorithm, since it's faster)
3. Encrypt the random_key using PKCS #1
4. Encrypt the message using <s>ARC4</s> a secure cipher method and the random_key (Note that ARC4 is no longer considered secure and that PHP strongly recommends to explicitly specify a secure cipher method using the `cipher_algo` param)
5. Output the encrypted_random_key and the encrypted_message

The receiving party can then decrypt the encrypted_random_key using their private_key and then decrypt the encrypted_message using the random_key.

Since there's no way of doing this in Python via the standard library, I'm just gonna' throw out the 3 approaches that I've tried out. At the time of writing, pyca/cryptography (cryptography.io) seems to be the most popular / most actively maintained library, so if I had to choose I'd probably recommend using this one.

Update: PyCrypto 2.x is unmaintained, obsolete, and contains security vulnerabilities!!!


//code python
# pyca/cryptography (cryptography.io) version
# pip install cryptography

import os

import cryptography
from cryptography import x509


message = 'Super secret secret message'
message = message.encode('utf-8')
certificate_data = open('/path/to/certificate.cer', 'r').read()
certificate_data = certificate_data.encode('utf-8')
certificate = cryptography.x509.load_pem_x509_certificate(data=certificate_data, backend=cryptography.hazmat.backends.default_backend())
public_key = certificate.public_key()
random_key = os.urandom(16)
encrypted_random_key = public_key.encrypt(plaintext=random_key, padding=cryptography.hazmat.primitives.asymmetric.padding.PKCS1v15())
print(encrypted_random_key)
# algorithm = cryptography.hazmat.primitives.ciphers.algorithms.ARC4(random_key)
algorithm = cryptography.hazmat.primitives.ciphers.algorithms.AES(random_key)
cipher = cryptography.hazmat.primitives.ciphers.Cipher(algorithm=algorithm, mode=None, backend=cryptography.hazmat.backends.default_backend())
encryptor = cipher.encryptor()
encrypted_message = encryptor.update(message)
print(encrypted_message)
//code


//code python
# M2Crypto version
# pip install pip install git+https://gitlab.com/m2crypto/m2crypto@python3

import M2Crypto


message = 'Super secret secret message'
message = message.encode('utf-8')
certificate = M2Crypto.X509.load_cert('/path/to/certificate.cer')
public_key = certificate.get_pubkey()
rsa_pub = public_key.get_rsa()
random_key = M2Crypto.Rand.rand_bytes(16)
encrypted_random_key = rsa_pub.public_encrypt(random_key, M2Crypto.RSA.pkcs1_padding)
print(encrypted_random_key)
# cipher = M2Crypto.EVP.Cipher(alg='rc4', key=random_key, iv=b'', op=M2Crypto.encrypt)
cipher = M2Crypto.EVP.Cipher(alg='aes_128_cbc', key=random_key, iv=b'', op=M2Crypto.encrypt)
encrypted_message = cipher.update(message)
encrypted_message += cipher.final()
print(encrypted_message)
//code


//code python
# PyCrypto version
# Update: PyCrypto 2.x is unmaintained, obsolete, and contains security vulnerabilities!!!
# pip install pycrypto

# Please bear in mind that PyCrypto cannot handle x509 certificates.
# You will have to extract the public_key to a pem file:
# openssl x509 -inform pem -in certificate.cer -pubkey -noout > public_key.pem

from Crypto import Random
from Crypto.Cipher import ARC4
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Cipher import PKCS1_v1_5
from Crypto.PublicKey import RSA


message = 'Super secret secret message'
message = message.encode('utf-8')
public_key_data = open('/path/to/public_key.pem', 'r').read()
public_key = RSA.importKey(public_key_data)
random_key = Random.new().read(16)
cipher = PKCS1_v1_5.new(public_key)
encrypted_random_key = cipher.encrypt(random_key)
print(encrypted_random_key)
cipher = ARC4.new(random_key)
encrypted_message = cipher.encrypt(message)
print(encrypted_message)
//code


Cryptography is hard. And the fact that there isn't a de facto Python cryptography library does not make things any easier.
