export interface ICacheClient {
  init: () => any;
  get: (id: string) => any;
  set: (id: string, data: any, options?: { get?: boolean; EX: number; PXAT: number; KEEPTTL: boolean }) => any;
  has: (id: string) => any;
}
