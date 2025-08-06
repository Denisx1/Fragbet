module.exports = {
  apps: [
    {
      name: "my-app",
      script: "src/index.ts",
      interpreter: "node",
      interpreter_args: "--require ts-node/register",
      watch: true,
      env_file: './.env',
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

