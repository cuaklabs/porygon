import { ContainerModule, ContainerModuleMetadata } from '@cuaklabs/iocuak';
import { DataSourceOptions } from 'typeorm';

import { PorygonTypeOrmSourceModuleSymbolsMap } from '../models/typeorm/PorygonTypeOrmSourceModuleSymbolsMap';
import { buildPorygonTypeOrmSourceModule } from './buildPorygonTypeOrmSourceModule';

export function buildPorygonTypeOrmSourceModuleMetadata(
  dataSourceOptions: DataSourceOptions,
  porygonTypeOrmSourceModuleSymbolsMap: PorygonTypeOrmSourceModuleSymbolsMap,
): ContainerModuleMetadata {
  return {
    factory: async (): Promise<ContainerModule> =>
      buildPorygonTypeOrmSourceModule(
        dataSourceOptions,
        porygonTypeOrmSourceModuleSymbolsMap,
      ),
    id: Symbol.for(
      `@cuaklabs/porygon/v1/TypeOrmSourceModuleMetadata_${porygonTypeOrmSourceModuleSymbolsMap.alias}`,
    ),
    injects: [],
  };
}
