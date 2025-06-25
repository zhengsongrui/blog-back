const express = require('express');
const app = express();
const PORT = 3000;

// 中间件
app.use(express.json()); // 解析 JSON 请求体
app.use(express.static('public')); // 静态文件服务

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

app.listen(PORT, () => {
  console.log(`启动 http://localhost:${PORT}`);
});

// 用于测试
app.get('/ces', (req, res) => {
  res.json({
    code:200,
    data:'测试'
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 - Server Error');
});

// // 新增用户路由
// app.get('/users', (req, res) => {
//   res.json([
//     { id: 1, name: 'Alice' },
//     { id: 2, name: 'Bob' }
//   ]);
// });

// // 带参数的路由
// app.get('/users/:id', (req, res) => {
//   const userId = parseInt(req.params.id);
//   res.json({ id: userId, name: `User ${userId}` });
// });

// // POST 请求处理 (需解析请求体)
// app.post('/users', express.json(), (req, res) => {
//   const newUser = req.body;
//   console.log('Creating user:', newUser);
//   res.status(201).json({ message: 'User created', user: newUser });
// });