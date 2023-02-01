/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.rawg.io']
  },
  publicRuntimeConfig: {
    REACT_APP_KEY: 'b986d781768f437cb5b6492fd3811892'
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig