/*
SQLyog Ultimate v10.00 Beta1
MySQL - 8.0.42 : Database - blog
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`blog` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `blog`;

/*Table structure for table `article` */

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(999) NOT NULL,
  `description` longtext,
  `createtime` datetime NOT NULL,
  `readCount` int NOT NULL DEFAULT '0',
  `content` longtext NOT NULL,
  `username` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;

/*Data for the table `article` */

insert  into `article`(`id`,`title`,`description`,`createtime`,`readCount`,`content`,`username`) values (1,'测试标题前端1','ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc','2025-06-26 13:37:05',17,'++下划线++\r\n\r\n~~中划线~~','testUser'),(2,'测试标题后端','测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述','2025-06-26 13:37:19',10,'++下划线++\r\n\r\n~~中划线~~\r\n\r\n++下划线++\r\n\r\n~~中划线~~','testUser'),(3,'服务器标题','bbbbbbbbbbb','2025-06-26 13:37:32',2,'++下划线++\r\n\r\n','testUser'),(4,'其他文章','测试描述','2025-06-26 13:37:39',10,'~~test~~','testUser'),(5,'测试标题前端2','测试描述','2025-06-26 18:09:08',13,'无意义的占位数据','testUser'),(6,'2Test','测试描述\r\n','2025-06-26 20:49:08',21,'无意义的占位数据','testUser'),(7,'3Test','测试描述1','2025-06-26 20:49:10',33,'无意义的占位数据','testUser'),(8,'4Test','测试描述测试描述','2025-06-26 20:49:14',15,'无意义的占位数据','testUser'),(9,'5Test','测试描述2','2025-06-26 20:49:16',11,'无意义的占位数据','testUser'),(10,'6Test','测试描述3','2025-06-26 20:49:19',18,'无意义的占位数据','testUser'),(11,'7Test','测试描述4','2025-06-26 20:49:22',17,'无意义的占位数据','testUser'),(12,'8Test','测试描述5','2025-06-26 20:49:24',32,'无意义的占位数据','testUser'),(13,'9Test','测试描述6','2025-06-26 20:49:28',22,'无意义的占位数据','testUser'),(14,'TS项目中封装Axios','纯代码','2025-06-26 20:50:57',106,'```javascript\nimport axios, {\n  type AxiosInstance,\n  type AxiosRequestConfig,\n  type AxiosResponse,\n  type InternalAxiosRequestConfig\n} from \'axios\'\n\n// 定义接口返回数据的通用结构（根据实际 API 结构调整）\ninterface ApiResponse<T = any> {\n  code: number\n  data: T\n  message: string\n}\n\nclass Request {\n  private instance: AxiosInstance\n  private baseConfig: AxiosRequestConfig = {\n    baseURL: import.meta.env.VITE_API_BASE as string, // 从环境变量获取\n    timeout: 15000,\n    headers: {\n      \'Content-Type\': \'application/json;charset=UTF-8\'\n    }\n  }\n\n  constructor() {\n    this.instance = axios.create(this.baseConfig)\n\n    // 请求拦截器\n    this.instance.interceptors.request.use(\n      (config: InternalAxiosRequestConfig) => {\n        // 添加认证 token（示例）\n        const token = localStorage.getItem(\'token\')\n        if (token) {\n          config.headers.Authorization = `Bearer ${token}`\n        }\n        return config\n      },\n      (error: any) => {\n        return Promise.reject(error)\n      }\n    )\n\n    // 响应拦截器\n    this.instance.interceptors.response.use(\n      (response: AxiosResponse) => {\n        // 处理通用响应逻辑\n        const res = response.data\n        \n        // 根据业务状态码处理（示例）\n        if (res.code !== 200) {\n          // 处理错误（如 token 过期）\n          if (res.code === 401) {\n            console.error(\'登录过期，请重新登录\')\n            // 跳转到登录页\n          }\n          return Promise.reject(res)\n        }\n        return res\n      },\n      (error: any) => {\n        // 处理 HTTP 错误状态码\n        let message = \'\'\n        switch (error.response?.status) {\n          case 400:\n            message = \'请求错误\'\n            break\n          case 401:\n            message = \'未授权，请登录\'\n            break\n          case 404:\n            message = \'请求地址不存在\'\n            break\n          case 500:\n            message = \'服务器内部错误\'\n            break\n          default:\n            message = \'网络连接异常\'\n        }\n        console.error(message)\n        return Promise.reject(error)\n      }\n    )\n  }\n\n  // 封装请求方法\n  public request<T = any>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {\n    return this.instance.request(config)\n  }\n\n  public get<T = any>(\n    url: string,\n    params?: object,\n    config?: AxiosRequestConfig\n  ): Promise<ApiResponse<T>> {\n    return this.request({ url, params, method: \'GET\', ...config })\n  }\n\n  public post<T = any>(\n    url: string,\n    data?: object,\n    config?: AxiosRequestConfig\n  ): Promise<ApiResponse<T>> {\n    return this.request({ url, data, method: \'POST\', ...config })\n  }\n\n  public put<T = any>(\n    url: string,\n    data?: object,\n    config?: AxiosRequestConfig\n  ): Promise<ApiResponse<T>> {\n    return this.request({ url, data, method: \'PUT\', ...config })\n  }\n\n  public delete<T = any>(\n    url: string,\n    config?: AxiosRequestConfig\n  ): Promise<ApiResponse<T>> {\n    return this.request({ url, method: \'DELETE\', ...config })\n  }\n}\n\n// 导出单例实例\nexport default new Request()\n```\n','zhengsongrui'),(17,'ccccc','ccccc','2025-06-29 19:54:16',130,'**粗体**\n*斜体*\n\n++下划线++\n\n# 一级标题\n\n~~中划线~~\n\n## 二级标题\n\n### 三级标题\n\n','testUser'),(19,'express后端用户认证工具','纯代码','2025-06-30 02:49:04',18,'### 1. 创建 JWT 工具文件 (utils/jwtUtils.js)\n\n```JavaScript\nconst jwt = require(\'jsonwebtoken\');\nrequire(\'dotenv\').config();\n\nconst JWT_SECRET = process.env.JWT_SECRET;\n\nclass JwtUtils {\n  /**\n   * 生成 JWT token\n   * @param {object} payload - 要存储在 token 中的数据\n   * @param {string} expiresIn - 有效期 (默认 7d)\n   * @returns {string} - JWT token\n   */\n  static generateToken(payload, expiresIn = \'7d\') {\n    return jwt.sign(payload, JWT_SECRET, { expiresIn });\n  }\n\n  /**\n   * 验证 JWT token\n   * @param {string} token - JWT token\n   * @returns {object} - 解码后的 token 数据\n   * @throws {Error} - 如果 token 无效或过期\n   */\n  static verifyToken(token) {\n    return jwt.verify(token, JWT_SECRET);\n  }\n\n  /**\n   * 从请求头中提取 token\n   * @param {object} req - Express 请求对象\n   * @returns {string|null} - 提取的 token 或 null\n   */\n  static extractToken(req) {\n    const authHeader = req.headers.authorization;\n    \n    if (authHeader && authHeader.startsWith(\'Bearer \')) {\n      return authHeader.split(\' \')[1];\n    }\n    \n    return null;\n  }\n}\n\nmodule.exports = JwtUtils;\n```\n---\n\n\n### 2. 创建认证中间件 (middleware/authMiddleware.js)\n\n```JavaScript\nconst JwtUtils = require(\'../utils/jwtUtils\');\nconst ApiResponse = require(\'../utils/apiResponse\');\n\nconst authMiddleware = async (req, res, next) => {\n  try {\n    // 1. 从请求头提取 token\n    const token = JwtUtils.extractToken(req);\n    \n    if (!token) {\n      return res.status(401).json(ApiResponse.error(\'未提供认证令牌\', 401));\n    }\n\n    // 2. 验证 token\n    const decoded = JwtUtils.verifyToken(token);\n    \n    // 3. 将解码后的用户信息附加到请求对象\n    req.user = decoded;\n    \n    next();\n  } catch (err) {\n    // 处理不同的 JWT 错误\n    let message = \'认证失败\';\n    let status = 401;\n    \n    if (err.name === \'TokenExpiredError\') {\n      message = \'令牌已过期\';\n      status = 401;\n    } else if (err.name === \'JsonWebTokenError\') {\n      message = \'无效令牌\';\n      status = 401;\n    } else {\n      message = \'服务器错误\';\n      status = 500;\n    }\n    \n    res.status(status).json(ApiResponse.error(message, status));\n  }\n};\n\nmodule.exports = authMiddleware;\n```\n\n---\n### 3.中间件使用示例\n\n```javascript\nconst express = require(\'express\');\nconst router = express.Router();\nconst authMiddleware = require(\'../middleware/authMiddleware\');\nconst UserController = require(\'../controllers/user.controller\');\n\n// 需要认证的路由\nrouter.get(\'/me\', authMiddleware, UserController.getCurrentUser);\nrouter.put(\'/me\', authMiddleware, UserController.updateCurrentUser);\n\nmodule.exports = router;\n\n```\n','zhengsongrui'),(21,'阿里云/腾讯云开放远程端口的坑','服务器上面折腾了半天没用，最后发现要在阿里云控制台上面设置！','2025-06-30 03:06:13',27,'今天下午在云服务器上面装好了mysql，通过命令行开放了3306端口，结果用sqlyog死活连不上，换了navicat也连不上。\n\n\n后面搜索了很多教程，重新试了好多遍都不行，然后去用deepseek搜教程，在deepseek教程的最下方发现这样一行小字：\n\n\n>  **注意：阿里云和腾讯云需要在网页控制台开放数据库的端口后，sqlyog才能远程连接数据库。**\n\n\n去阿里云的控制台页面一看，居然有防火墙设置，简简单单设置完成保存。然后用sqlyog连接数据库，成功！\n\n![FANPCC4XA`69VVRCC.jpg](http://localhost:80/uploads/zhengsongrui/image-1751277255384-58158544.jpg)\n\n','zhengsongrui'),(23,'nodejs检查路径并创建工具','纯代码','2025-06-30 18:03:42',48,'### 1. 创建文件 mkdir.js\n\n```JavaScript\nconst fs = require(\"fs\");\nconst path = require(\"path\");\n\n/**\n * 读取路径信息\n * @param {string} path 路径\n */\nfunction getStat(path){\n    return new Promise((resolve, reject) => {\n        fs.stat(path, (err, stats) => {\n            if(err){\n                resolve(false);\n            }else{\n                resolve(stats);\n            }\n        })\n    })\n}\n \n/**\n * 创建路径\n * @param {string} dir 路径\n */\nfunction mkdir(dir){\n    return new Promise((resolve, reject) => {\n        fs.mkdir(dir, err => {\n            if(err){\n                resolve(false);\n            }else{\n                resolve(true);\n            }\n        })\n    })\n}\n \n/**\n * 路径是否存在，不存在则创建\n * @param {string} dir 路径\n */\nasync function dirExists(dir){\n    let isExists = await getStat(dir);\n    //如果该路径且不是文件，返回true\n    if(isExists && isExists.isDirectory()){\n        return true;\n    }else if(isExists){     //如果该路径存在但是文件，返回false\n        return false;\n    }\n    //如果该路径不存在\n    let tempDir = path.parse(dir).dir;      //拿到上级路径\n    //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在\n    let status = await dirExists(tempDir);\n    let mkdirStatus;\n    if(status){\n        mkdirStatus = await mkdir(dir);\n    }\n    return mkdirStatus;\n}\n\nmodule.exports = {\n    dirExists\n}\n```\n\n---\n\n### 2. 引入文件并使用\n\n```JavaScript\nconst { dirExists } = require(\"../utils/mkdir\");\ndirExists(`路径`);\n```\n','zhengsongrui');

/*Table structure for table `article_category` */

DROP TABLE IF EXISTS `article_category`;

CREATE TABLE `article_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `articleId` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

/*Data for the table `article_category` */

insert  into `article_category`(`id`,`articleId`,`categoryId`) values (1,1,1),(2,2,2),(3,3,3),(4,4,4),(6,5,1),(7,6,1),(8,7,1),(9,8,1),(10,9,1),(11,10,1),(12,11,1),(13,12,1),(14,13,1),(15,14,13),(18,17,27),(20,19,28),(22,21,29),(24,23,28);

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `level` int NOT NULL DEFAULT '1',
  `username` varchar(20) NOT NULL,
  `sort` int NOT NULL DEFAULT '99',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;

/*Data for the table `category` */

insert  into `category`(`id`,`name`,`level`,`username`,`sort`) values (1,'前端',1,'testUser',1),(2,'后端',1,'testUser',2),(3,'服务器',1,'testUser',3),(4,'其他',1,'testUser',4),(13,'前端',1,'zhengsongrui',1),(27,'214124',1,'testUser',99),(28,'后端',1,'zhengsongrui',2),(29,'服务器',1,'zhengsongrui',3),(30,'硬件',1,'zhengsongrui',4),(31,'生活',1,'zhengsongrui',5);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(999) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `createtime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`password`,`nickname`,`createtime`) values (1,'zhengsongrui','e10adc3949ba59abbe56e057f20f883e','PEI','2025-06-26 13:38:36'),(2,'testUser','e10adc3949ba59abbe56e057f20f883e','测试用户','2025-06-26 13:39:05');

/*Table structure for table `user_browsinghistory` */

DROP TABLE IF EXISTS `user_browsinghistory`;

CREATE TABLE `user_browsinghistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `articleId` int NOT NULL,
  `historytime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articleId` (`articleId`)
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=utf8mb3;

/*Data for the table `user_browsinghistory` */

insert  into `user_browsinghistory`(`id`,`username`,`articleId`,`historytime`) values (154,'testUser',1,'2025-07-02 22:14:54'),(160,'testUser',17,'2025-07-02 22:15:39'),(166,'testUser',5,'2025-07-02 22:15:42'),(167,'testUser',4,'2025-07-02 22:15:42'),(168,'testUser',3,'2025-07-02 22:15:42'),(169,'testUser',2,'2025-07-02 22:15:43'),(173,'testUser',6,'2025-07-02 22:17:24'),(177,'testUser',8,'2025-07-02 22:18:01'),(179,'testUser',12,'2025-07-02 22:18:11'),(181,'testUser',9,'2025-07-02 22:18:26'),(182,'testUser',7,'2025-07-02 22:18:31'),(183,'testUser',10,'2025-07-02 22:18:33'),(184,'testUser',13,'2025-07-02 22:18:35'),(186,'zhengsongrui',23,'2025-07-03 14:36:00');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
