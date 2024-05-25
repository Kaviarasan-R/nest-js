import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export interface EnvConfig {
  [key: string]: string;
}

export interface ConfigModuleOptions {
  path: string;
}

@Injectable()
export class CustomConfigService {
  private readonly envConfig: EnvConfig;

  /* To access options use provide value as same as @Inject('CUSTOM_CONFIG')  */
  constructor(@Inject('CUSTOM_CONFIG') options: ConfigModuleOptions) {
    console.log(path.resolve(__dirname, options.path, '.env'));
    const envFile = path.resolve(__dirname, options.path, '.env');
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
