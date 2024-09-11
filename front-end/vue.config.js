// webpack-dev-server 가 활용하는 포트를 8080 -> 3000 으로 변경 (프론트엔드, 백엔드 동시 수행 위함)
module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8080'
      }
    }
  },
  configureWebpack: {
    entry: {
      app: './src/main.js',
      style: [
        'bootstrap/dist/css/bootstrap.min.css'
      ]
    }
  }
}
