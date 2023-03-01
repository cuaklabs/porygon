import {
  ContainerModule,
  ContainerModuleFactoryMetadata,
  ContainerModuleMetadata,
  ServiceId,
} from '@cuaklabs/iocuak';
import { DataSourceOptions } from 'typeorm';

import { PorygonTypeOrmSourceModuleSymbolsMap } from '../models/typeorm/PorygonTypeOrmSourceModuleSymbolsMap';
import { buildPorygonTypeOrmSourceModule } from './buildPorygonTypeOrmSourceModule';

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
      `@cuaklabs/porygon/v1/TypeOrmSourceModuleMetadata_${porygonTypeOrmSourceModuleSymbolsMap.alias}`,
    ),
    injects: [dataSourceOptionsServiceId],
  };

  return porygonTypeOrmSourceModuleMetadata;
}
