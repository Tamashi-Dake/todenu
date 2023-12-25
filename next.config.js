/**
 * @type {import('next').NextConfig}
 */
const path = require("path");
// try to use this config for Image component but it doesn't work, something went wrong in here
const nextConfig = {
  // image: {
  //   domains: ["lh3.googleusercontent.com"],
  // },
  // uncomment this when deploy
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     "@": path.resolve(__dirname, "./"),
  //   };
  //   return config;
  // },
};

module.exports = nextConfig;
