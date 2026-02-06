declare module "next-pwa" {
  type PWAOptions = {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    customWorkerDir?: string;
  };

  export default function withPWA(options?: PWAOptions): <T>(nextConfig: T) => T;
}
