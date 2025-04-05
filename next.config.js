/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        // Turbopack 규칙 설정
        // https://turbo.build/pack/docs/reference/configuration#rules
      },
    },
  },
}

module.exports = nextConfig 