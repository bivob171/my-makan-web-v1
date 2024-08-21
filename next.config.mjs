/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "img.icons8.com",
      "flagcdn.com",
      "tecdn.b-cdn.net",
      "i.ibb.co",
      "getfit-image-file.s3.amazonaws.com",
      "getfit-image-file.s3.ap-southeast-1.amazonaws.com",
      "spruko.com",
      "youtube.com",
      "drive.google.com",
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
      "mymakan-image.s3.eu-north-1.amazonaws.com",
      "md-bayzid2.imgbb.com",
      "mymakan-image.s3.amazonaws.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/main",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/socket.io/:path*",
        destination: "http://localhost:4000/socket.io/:path*", // Proxy to backend
      },
    ];
  },
};

export default nextConfig;
