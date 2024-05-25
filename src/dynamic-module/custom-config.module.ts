import { DynamicModule, Module } from '@nestjs/common';
import { CustomConfigService } from './custom-config.service';

export interface ConfigModuleOptions {
  path: string;
}

@Module({})
export class CustomConfigModule {
  static register(options: ConfigModuleOptions): DynamicModule {
    return {
      module: CustomConfigModule,
      providers: [
        {
          provide:
            'CUSTOM_CONFIG' /* By @Inject('CUSTOM_CONFIG') get the options value in following providers in array only. */,
          useValue: options,
        },
        CustomConfigService,
      ],
      exports: [CustomConfigService],
    };
  }
}
