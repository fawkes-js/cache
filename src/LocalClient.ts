import { type ICacheClient } from './ICacheClient';

// class GuildCache {
//   cache: object;
//   constructor(cache: object) {
//     this.cache = cache;
//   }

//   get(guild: string): any {
//     const key = `guild:${guild}`;
//     if (!this.cache[key]) return null;
//     else return this.cache[key];
//   }

//   set(guild: string, data: any): object {
//     const key = `guild:${guild}`;
//     this.cache[key] = data;
//     return this.cache[key];
//   }
// }

// class ChannelCache {
//   cache: object;
//   guild: string;
//   constructor(cache: object) {
//     this.cache = cache;
//   }

//   get(channel: string, guild: string): any {
//     const key = `guild:${guild}:channel:${channel}`;
//     if (!this.cache[key]) return null;
//     else return this.cache[key];
//   }

//   set(channel: string, guild: string, data: any): object {
//     const key = `guild:${guild}:channel:${channel}`;
//     this.cache[key] = data;
//     return this.cache[key];
//   }
// }

// class MemberCache {
//   cache: object;
//   guild: string;
//   constructor(cache: object) {
//     this.cache = cache;
//   }

//   get(member: string, guild: string): any {
//     const key = `guild:${guild}:member:${member}`;
//     if (!this.cache[key]) return null;
//     else return this.cache[key];
//   }

//   set(member: string, guild: string, data: any): object {
//     const key = `guild:${guild}:member:${member}`;
//     this.cache[key] = data;
//     return this.cache[key];
//   }
// }

export class LocalClient implements ICacheClient {
  // guilds: GuildCache;
  // channels: ChannelCache;
  // members: MemberCache;
  cache: any;
  constructor() {
    this.cache = {};

    // this.guilds = new GuildCache(this.cache);

    // this.channels = new ChannelCache(this.cache);

    // this.members = new MemberCache(this.cache);
  }

  async init(): Promise<void> {}

  async get(id: string): Promise<any> {
    if (!this.cache[id]) return null;
    else return this.cache[id].data;
  }

  async set(id: string, data: any, options?: { get?: boolean; EX?: number; PXAT?: number; KEEPTTL?: boolean }): Promise<object> {
    let expire: number | null = null;

    if (options) {
      if (options.EX) {
        expire = Date.now() + options.EX! * 1000;
      }
      if (options.PXAT) expire = options.PXAT;
      if (options.KEEPTTL) expire = this.cache[id].expire;
    }

    this.cache[id] = { data, expire: expire };

    return this.cache[id].data;
  }

  async del(id: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.cache[id];
  }

  async has(id: string): Promise<boolean> {
    if (this.cache[id].data) return true;
    else return false;
  }

  async ttl(id: string) {
    const cache = this.cache[id];

    if (!cache) return null;
    if (!cache.expire) return null;
    else {
      const expiry = (cache.expire - Date.now()) / 1000;

      if (expiry <= 0) delete this.cache[id];
      else return expiry;
    }
  }

  async keys(id: string): Promise<any> {
    return await this.cache.find((key: string) => key.startsWith(id));
  }
}
