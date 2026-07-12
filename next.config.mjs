/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'localhost' },
      { protocol: 'https', hostname: 'oss-cn-hangzhou.aliyuncs.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
