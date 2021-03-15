# Expense-Tracker

簡易記帳小工具~
掌控金流好開心!

## Features - 產品功能

<登入 & 註冊頁面>

1. 註冊 -> 使用者可以設定姓名、信箱、密碼
2. 登入 -> 使用者註冊成功後，可以登入
3. 點擊 Facebook login -> 使用者可以用 Facebook 帳號登入

<登入後頁面>

1. 首頁 -> 使用者可瀏覽所有支出清單、總支出金額
2. 點擊 新增支出 按鈕 -> 使用者可創造一筆新的支出明細
3. 點擊 總覽 按鈕 -> 使用者可重新瀏覽所有支出清單、總支出金額
4. 點擊 全部類別 下拉選單 -> 使用者可以選擇不同的支出類別，並瀏覽該類別的支出清單
5. 點擊 全部月份 下拉選單 -> 使用者可以選擇不同的月份，並瀏覽該月份的支出清單
6. 點擊 修改 按鈕 -> 使用者可編輯單一支出清單的詳細資料
7. 點擊 刪除 按鈕 -> 使用者可刪除單一支出清單
8. 點擊 Expense Manager(首頁左上角) -> 任何情況下點擊均會回到首頁
9. 點擊 Logout(首頁右上角) -> 任何情況下點擊均會登出，並回到 login 頁面

### 註冊頁

![](pictures/register.png)

### 登入頁

![](pictures/login.png)

### 首頁

![](pictures/index.png)

### 新增支出頁面

![](pictures/create.png)

### 修改頁面

![](pictures/edit.png)

## Installing - 專案安裝流程

1. 開啟終端機，執行以下指令 :

   > `git clone https://github.com/KarolChang/expense-tracker.git`

2. 進入專案資料夾

   > `cd expense-tracker`

3. 透過 npm 安裝套件

   > `npm install`

4. 安裝 nodemon

   > `npm install -g nodemon`

5. 使用腳本啟動專案

   > `npm run seed`

   > `npm run dev`

   > 在瀏覽器進入 http://localhost:3000

## Environment & Tools - 環境&使用工具

- [Visual Studio Code 編輯器](https://code.visualstudio.com/)
- [Node.js (v10.15.0)](https://nodejs.org/en/)
- [express 框架](https://www.npmjs.com/package/express)
- [express handlebars 模板引擎](https://www.npmjs.com/package/express-handlebars)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [method-override](https://www.npmjs.com/package/method-override)
- [mongoDB](https://www.mongodb.com/2)
- [mongoose](https://mongoosejs.com/)

* [express-session](https://www.npmjs.com/package/express-session)
* [passport](https://www.npmjs.com/package/passport)
* [passport-local](https://www.npmjs.com/package/passport-local)
* [passport-facebook](https://www.npmjs.com/package/passport-facebook)
* [connect-flash](https://www.npmjs.com/package/connect-flash)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [dotenv](https://www.npmjs.com/package/dotenv)
