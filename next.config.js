/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "*" }]
    },
    compiler: {
      // Enables the styled-components SWC transform
      styledComponents: true
    },
    transpilePackages: ["@mui/x-charts"]
}

module.exports = nextConfig
