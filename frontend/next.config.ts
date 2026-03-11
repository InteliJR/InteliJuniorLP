const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "hoirqrkdgbmvpwutwuwj.supabase.co",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "logo.clearbit.com",
            },
            {
                protocol: "https",
                hostname: "cdn.simpleicons.org",
            },
        ],
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 60 * 60 * 24 * 30,
    },
};

export default nextConfig;
