/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'hiragana.style', 'api.hiragana.style'],
  }
}

module.exports = nextConfig
