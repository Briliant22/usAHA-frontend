/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'hacketek-usaha.s3.amazonaws.com',
          port: '',
          pathname: '/tool_images/**',
        },
        {
          protocol: 'https',
          hostname: 'hacketek-usaha.s3.amazonaws.com',
          port: '',
          pathname: '/facility_images/**',
        },
      ],
    },
  }
  
  export default nextConfig;