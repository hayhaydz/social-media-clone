module.exports = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  env: {
    PRIVATE_API_URL: process.env.PRIVATE_API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  }
}
