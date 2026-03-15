import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flzpfxtdlptgjwhodxhy.supabase.co',
                pathname: '/storage/v1/object/public/**',
            },
        ],
    },
    reactCompiler: true,
};

export default nextConfig;
