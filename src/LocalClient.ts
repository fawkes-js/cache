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
    else return this.cache[id];
  }

  async set(id: string, data: any): Promise<object> {
    this.cache[id] = data;
    return this.cache[id];
  }

  async del(id: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.cache[id];
  }

  async has(id: string): Promise<boolean> {
    if (this.cache[id]) return true;
    else return false;
  }
}
