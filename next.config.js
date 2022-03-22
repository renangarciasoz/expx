/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const { i18n } = require("./next-i18next.config");

const nextConfig = withPWA({
  i18n,
  reactStrictMode: true,
  images: {
    domains: ["github.com"],
  },
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    runtimeCaching,
  },
});

module.exports = nextConfig;
