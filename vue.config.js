// vue.config.js
module.exports = {
    devServer: { //代理
      open: true, //配置自动启动浏览器
      host: 'localhost',
      port: 8080, // 端口号
      https: false,
      hotOnly: false,
      proxy: {
        '/manage': {
          target: 'http://localhost:8088/',
          changeOrigin: true,
          pathRewrite: {}
        }
      }
    }
  }