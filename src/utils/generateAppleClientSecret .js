import jwt from "jsonwebtoken";

const generateAppleClientSecret = () => {
  const privateKey = process.env.NEXT_PUBLIC_APPLE_PRIVATE_KEY.replace(
    /\\n/g,
    "\n"
  );
  const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
  const teamId = process.env.NEXT_PUBLIC_APPLE_TEAM_ID;
  const keyId = process.env.NEXT_PUBLIC_APPLE_KEY_ID;

  const token = jwt.sign({}, privateKey, {
    algorithm: "ES256",
    expiresIn: "180d", // Maximum allowed expiration is 6 months
    audience: "https://appleid.apple.com",
    subject: clientId,
    issuer: teamId,
    header: {
      alg: "ES256",
      kid: keyId,
    },
  });

  return token;
};

export default generateAppleClientSecret;
