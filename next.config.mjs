/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatar.iran.liara.run'],
    },
    experimental: {
        trustHost: true,
    },
};

export default nextConfig;
