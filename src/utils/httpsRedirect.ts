
// Force HTTPS redirect in production environments
export const forceHttps = () => {
  if (
    import.meta.env.PROD && 
    window.location.protocol !== "https:" && 
    !window.location.hostname.includes("localhost") && 
    !window.location.hostname.includes("127.0.0.1")
  ) {
    // Use window.location.href to preserve the full path when redirecting
    window.location.href = window.location.href.replace("http:", "https:");
  }
};
