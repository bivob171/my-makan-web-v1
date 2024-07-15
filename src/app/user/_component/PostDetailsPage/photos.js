const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const data = [
  {
    _id: "7581",
    type: "image",
    url: "https://mymakan-image.s3.eu-north-1.amazonaws.com/1720686380139-3437694-200.png",
  },
  {
    _id: "7909",
    type: "image",
    url: "https://mymakan-image.s3.eu-north-1.amazonaws.com/1720686380145-Add%20a%20heading%20%281%29.png",
  },
  {
    _id: "6629",
    type: "image",
    url: "https://mymakan-image.s3.amazonaws.com/1720749335085-Screenshot%202024-05-22%20115213.png",
  },
];

// Function to get image dimensions (mocked for simplicity, replace with actual logic to get image dimensions)
function getImageDimensions(url) {
  // Mocked dimensions, replace with actual dimensions retrieval logic
  return { width: 1080, height: 720 };
}

const photos = data.map(({ url }) => {
  const { width, height } = getImageDimensions(url);
  return {
    src: url,
    width,
    height,
    srcSet: breakpoints.map((breakpoint) => ({
      src: url,
      width: breakpoint,
      height: Math.round((height / width) * breakpoint),
    })),
  };
});

export default photos;
