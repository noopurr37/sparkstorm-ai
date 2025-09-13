
// HTTPS redirect temporarily disabled
export const forceHttps = () => {
  // Disabled for now - site will work over HTTP
  // if (
  //   import.meta.env.PROD && 
  //   window.location.protocol !== "https:" && 
  //   !window.location.hostname.includes("localhost") && 
  //   !window.location.hostname.includes("127.0.0.1")
  // ) {
  //   window.location.href = window.location.href.replace("http:", "https:");
  // }
};
