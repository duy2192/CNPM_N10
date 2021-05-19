# CNPM_N10

## SETUP
```
+ Cài đặt NodeJS (https://nodejs.org/en/download/) 
+ Mở Terminal (cmd)
+ Kiểm tra cài đặt NodeJs thành công: node -v (hoặc npm -v). Lỗi thì thêm path NodeJs vào 'Environment variables'
+ Cài đặt Yarn: npm install --global yarn (nếu có lỗi về scripts... thì gõ: Set-ExecutionPolicy Unrestricted )
+ git clone <link repo>
+ Vào project: cd CNPM_N10
+ Cài đặt project front-end: yarn install 
+ Vào mục backend: cd server 
+ Cài đặt project back-end: npm install 
```

## START
```
+ Mở Terminal (cmd)
+ Vào thư mục CNPM_N10: cd CNPM_N10
+ Chạy frontend Vue: yarn serve
+ Vào thư mục server: cd server
+ Chạy backend NodeJs: npm start (hoặc node index.js để ko tự động restart khi save file)
+ Backend chạy ở localhost:3000
+ App chạy ở url khi chạy: yarn serve (App running at: - Local:   http://localhost:8080/)
```

## Project setup
```

yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
