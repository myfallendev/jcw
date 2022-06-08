## Jetcrypto web frontend ##

https://beta.jetcrypto.com

[![Build Status](http://10.49.1.15:8080/buildStatus/icon?job=jetcrypto_webapp)](http://10.49.1.15:8080/view/jetcrypto/job/jetcrypto_webapp/)

## Uses ##

Node 8  
React  
Redux  

## Build with ##

```
npm install --quiet
npm run build
./precompress_static.sh
```

Ready webapp will be in `build` dir.

## Installation ##

Use [nginx config](jetcrypto.nginx) for proxy and static delivery