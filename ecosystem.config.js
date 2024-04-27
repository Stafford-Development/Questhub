module.exports = {
    apps: [
      {
        name: 'server',
        script: './server/server.js',
        watch: true,
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
      {
        name: 'client',
        script: 'serve',
        env: {
          PM2_SERVE_PATH: './client',
          PM2_SERVE_PORT: 8080,
        },
        env_production: {
          PM2_SERVE_PATH: './client',
          PM2_SERVE_PORT: 80,
        },
      },
    ],
  };