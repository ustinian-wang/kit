# 帮助手册

## Q: npm install 很慢



## Q：怎么发布npm包

- npm login
- npm publish

## Q: npm publish 发布不了

问题原因：墙的缘故
解决方式：
    1. 梯子开一下
        2. 设置npm的代理服务器地址，端口号可以在梯里面找http:
npm config set proxy http://127.0.0.1:8001

## Q: package.json如何填写

```json
{
  "name": "my-awesome-package",
  "version": "1.0.0",
  "description": "An awesome package for JavaScript",
  "main": "dist/index.js",
  "scripts": {
    "build": "webpack",
    "test": "jest",
    "start": "node dist/index.js"
  },
  "keywords": [
    "awesome",
    "package",
    "JavaScript"
  ],
  "files": [
    "dist"
  ],
  "author": {
    "name": "Your Name",
    "email": "your-email@example.com"
  },
  "license": "MIT",
  "dependencies": {
    "axios": "^0.21.1"
  },
  "devDependencies": {
    "jest": "^27.0.4",
    "webpack": "^5.45.1",
    "webpack-cli": "^4.8.0"
  },
  "repository": "https://github.com/your-username/my-awesome-package",
  "homepage": "https://github.com/your-username/my-awesome-package#readme"
}

```

## Q: 如果没有修改源代码，只是改了package.json，npm要怎么发布这个包，需要修改版本号么？

按照npm的规范来说是不行的，你只能`修订号`+1来重新发包了。

