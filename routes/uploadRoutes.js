const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const strictAuthMiddleware = require("../middleware/strictAuthMiddleware");
const { dirExists } = require("../utils/mkdir");

// 配置 存储
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await dirExists(`uploads/${req.user.username}/`);
    cb(null, `uploads/${req.user.username}/`); // 存储目录
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名：时间戳 + 随机数 + 原始扩展名
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// 文件过滤器（可选）
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("只允许上传 JPG, PNG 或 GIF 图片"), false);
  }
};

// 初始化 Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 限制文件大小为 5MB
  },
});

// 单文件上传接口
router.post(
  "/singleFile",
  strictAuthMiddleware,
  upload.single("image"),
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "未上传文件" });
      }

      // 返回文件访问路径（需根据实际环境配置）
      const fileUrl = `${process.env.ORIGIN}:${process.env.PORT}/uploads/${req.user.username}/${req.file.filename}`;
      res.json({
        message: "上传成功",
        code: 200,
        url: fileUrl,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);


module.exports = router;
