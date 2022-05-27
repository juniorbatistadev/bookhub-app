module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
            "@res": "./src/resources",
            "@components": "./src/components",
            "@screens": "./src/screens",
          },
        },
      ],
    ],
  };
};
