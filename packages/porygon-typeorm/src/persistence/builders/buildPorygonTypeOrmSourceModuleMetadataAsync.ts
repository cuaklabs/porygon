import {
  ContainerModule,
  ContainerModuleFactoryMetadata,
  ContainerModuleMetadata,
  ServiceId,
} from '@cuaklabs/iocuak';
import { DataSourceOptions } from 'typeorm';

import { PorygonTypeOrmSourceModuleSymbolsMap } from '../models/domain/PorygonTypeOrmSourceModuleSymbolsMap';
import { buildPorygonTypeOrmSourceModule } from './buildPorygonTypeOrmSourceModule';

const VERSION: string = 'v1';

export function buildPorygonTypeOrmSourceModuleMetadataAsync(
  dataSourceOptionsServiceId: ServiceId,
  porygonTypeOrmSourceModuleSymbolsMap: PorygonTypeOrmSourceModuleSymbolsMap,
): ContainerModuleMetadata {
  const porygonTypeOrmSourceModuleMetadata: ContainerModuleFactoryMetadata = {
    factory: async (
      dataSourceOptions: DataSourceOptions,
    ): Promise<ContainerModule> =>
      buildPorygonTypeOrmSourceModule(
        dataSourceOptions,
        porygonTypeOrmSourceModuleSymbolsMap,
      ),
    id: Symbol.for(
      `@cuaklabs/porygon/${VERSION}/TypeOrmSourceModuleMetadata_${porygonTypeOrmSourceModuleSymbolsMap.alias}`,
    ),
    injects: [dataSourceOptionsServiceId],
  };

  return porygonTypeOrmSourceModuleMetadata;
}
