module.exports = {
  apps: [
    {
      name: "NextAppName",
      exec_mode: "cluster",
      instances: "max", // Or a number of instances
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env_local: {
        APP_ENV: "local", // APP_ENV=local
        PORT: 3006,
      },
      env_development: {
        APP_ENV: "dev", // APP_ENV=dev
        PORT: 3006,
      },
      env_production: {
        APP_ENV: "prod", // APP_ENV=prod
        PORT: 3006,
      },
    },
  ],
};
