require('dotenv').config();
const express = require('express');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3000;

// console.log(process.env)

// 中间件
app.use(express.json()); // 解析 JSON 请求体

// 配置静态文件目录（托管前端构建文件）
const frontendBuildPath = path.join(__dirname, '/public');
app.use(express.static(frontendBuildPath));
// 提供静态文件访问
app.use('/uploads', express.static('uploads'));

// 日志中间件
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


const articleRoutes = require('./routes/articleRoutes');
app.use('/api/articles', articleRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/category', categoryRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);


const options = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.crt')
};

https.createServer(options, app)
  .listen(443, () => console.log(`App listening on port 443!`));

  http.createServer(app)
  .listen(SERVER_PORT, () => console.log(`App listening on port ${SERVER_PORT}!`));

// // 所有其他请求返回前端应用（支持前端路由）
// app.get('/', (req, res) => {
//   console.log(path.join(frontendBuildPath, '/blog_front/index.html'))
//   res.sendFile(path.join(frontendBuildPath, '/blog_front/index.html'));
// });

// app.get('/test', (req, res) => {
//   res.send('1234')
// });


// 404 处理
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  // res.status(500).send('500 - Server Error');
   if (err instanceof multer.MulterError) {
    // Multer 错误（如文件大小超限）
    res.status(400).json({ error: err.message });
  } else {
    // 其他错误
    res.status(500).json({ error: err.message });
  }
});


