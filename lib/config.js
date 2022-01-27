const getFileLoaderDefaultConfig = ({ isDev }) => ({
  name: isDev ? "[path][name].[ext]" : "img/[name].[contenthash:7].[ext]",
});

module.exports.getFileLoaderDefaultConfig = getFileLoaderDefaultConfig;
