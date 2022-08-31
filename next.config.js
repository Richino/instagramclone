/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async redirects() {
        return [
            {
                source: "/dashboard/overview",
                destination: "/",
                permanent: true,
            },
        ];
    },
    images: {
        domains: ["instagram.fmia1-2.fna.fbcdn.net", "instagram.fmia1-1.fna.fbcdn.net"],
    },
};

module.exports = nextConfig;
