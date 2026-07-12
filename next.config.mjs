/** @type {import('next').NextConfig} */
const isGithubPages = process.env.DEPLOY_TARGET === 'github'

const nextConfig = {
  reactStrictMode: true,
  output: isGithubPages ? 'export' : undefined,
  basePath: isGithubPages ? '/mengfuture-website' : '',
  assetPrefix: isGithubPages ? '/mengfuture-website/' : '',
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'localhost' },
      { protocol: 'https', hostname: 'oss-cn-hangzhou.aliyuncs.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: isGithubPages,
}

export default nextConfig
