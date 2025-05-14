
// Force HTTPS redirect in production environments
export const forceHttps = () => {
  if (
    import.meta.env.PROD && 
    location.protocol !== "https:" && 
    !location.hostname.includes("localhost") && 
    !location.hostname.includes("127.0.0.1")
  ) {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
  }
};
