export const copySpaceId = (spaceId) => {
  navigator.clipboard.writeText(spaceId);

  return {
    status: true,
    message: { title: "Copied!", data: "SpaceId copied to clipboard." },
  };
};
