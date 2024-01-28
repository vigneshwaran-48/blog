/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "localhost" }, { hostname: "lh3.googleusercontent.com" }, { hostname: "192.168.172.188" }]
    },
    reactStrictMode: false
}

module.exports = nextConfig
