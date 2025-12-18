export const formatProjectDate = (timestamp?: number | string | null) => {
  if (!timestamp) {
    return {
      header: "Loading...",
      badge: "Loading..."
    };
  }

  const date = new Date(Number(timestamp) * 1000);

  const header = `Uploaded on ${date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })} at ${date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase()}`;

  const badge = `Uploaded ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })} (${date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })})`;

  return { header, badge };
};
