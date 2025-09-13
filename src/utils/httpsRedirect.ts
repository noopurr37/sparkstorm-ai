
// Force HTTPS redirect and www subdomain in production environments
export const forceHttps = () => {
  const hostname = window.location.hostname;
  const isProduction = import.meta.env.PROD;
  const isLocalhost = hostname.includes("localhost") || hostname.includes("127.0.0.1");
  
  if (isProduction && !isLocalhost) {
    // Force HTTPS
    if (window.location.protocol !== "https:") {
      window.location.href = window.location.href.replace("http:", "https:");
      return;
    }
    
    // Force www subdomain for sparkstorm.ai
    if (hostname === "sparkstorm.ai") {
      window.location.href = window.location.href.replace("sparkstorm.ai", "www.sparkstorm.ai");
      return;
    }
  }
};
