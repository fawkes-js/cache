import { type DiscordAPIGuild } from '@fawkes.js/typings';
import { createClient, type RedisClientType } from 'redis';
import { type ICacheClient } from './ICacheClient.js';

export interface REDISOptions {
  url?: string;
  hostname?: string;
  port?: string;
  username?: string;
  password?: string;
}

class RedisCache {
  cache: RedisClientType;
  private readonly type: string;
  constructor(client: RedisClient, type: string) {
    this.cache = client.cache;

    this.type = type;
  }

  async get(id: string): Promise<any> {
    const data = await this.cache.get(id);
    if (data === null) return null;
    else return JSON.parse(data);
  }

  async set(id: string, data: any): Promise<any> {
    return await this.cache.set(id, JSON.stringify(data));
  }

  async del(id: string): Promise<any> {
    return await this.cache.del(id);
  }

  async has(id: string): Promise<any> {
    const key = `guild:${id}`;
    if ((await this.cache.get(key)) !== null) return true;
    else return false;
  }
}

export class RedisClient implements ICacheClient {
  options: REDISOptions;
  cache!: RedisClientType;
  guilds: RedisCache;
  channels: RedisCache;
  members: RedisCache;
  constructor(redisOptions: REDISOptions) {
    this.options = redisOptions;

    Object.defineProperty(this, 'cache', { value: null, writable: true });

    this.guilds = new RedisCache(this, 'guilds');

    this.channels = new RedisCache(this, 'channels');

    this.members = new RedisCache(this, 'members');
  }

  async init(): Promise<void> {
    const url =
      (<string>this.options.url).length > 0
        ? this.options.url
        : `redis://${<string>this.options.username}:${<string>this.options.password}@${<string>this.options.hostname}:${<string>(
            this.options.port
          )}`;

    this.cache = createClient({ url });

    await this.cache.connect();
  }

  async get(id: string): Promise<any> {
    const data = await this.cache.get(id);
    if (data === null) return null;
    else return JSON.parse(data);
  }

  async set(id: string, data: any): Promise<any> {
    return await this.cache.set(id, JSON.stringify(data));
  }

  async del(id: string): Promise<any> {
    return await this.cache.del(id);
  }

  async has(id: string): Promise<any> {
    const key = `guild:${id}`;
    if ((await this.cache.get(key)) !== null) return true;
    else return false;
  }

  async patch(id: string, data: DiscordAPIGuild): Promise<any> {
    const key = `guild:${id}`;

    return await this.cache.set(key, JSON.stringify(data));
  }
}
