/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  
  experimental: {
    serverActions: {
      allowedOrigins: [
        '*.app.github.dev',        // This allows all GitHub Codespace URLs
        'localhost:3000'           // This allows local development
      ],
    },
  },
};

export default nextConfig;