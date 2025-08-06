export function parseUserAgent(ua: string): {
  device: string;
  os: string;
  browser: string;
} {
  let device = /mobile/i.test(ua) ? "mobile" : "desktop";
  let browser = "unknown";
  let os = "unknown";

  if (/chrome/i.test(ua)) browser = "Chrome";
  else if (/firefox/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua)) browser = "Safari";

  if (/windows/i.test(ua)) os = "Windows";
  else if (/mac os/i.test(ua)) os = "MacOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad/i.test(ua)) os = "iOS";

  return { device, os, browser };
}
