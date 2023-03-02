import { ContainerModule, ContainerModuleMetadata } from '@cuaklabs/iocuak';
import { DataSourceOptions } from 'typeorm';

import { PorygonTypeOrmSourceModuleSymbolsMap } from '../../models/domain/PorygonTypeOrmSourceModuleSymbolsMap';
import { porygonTypeOrmSymbolKeyVersion } from '../../models/domain/porygonTypeOrmSymbolKeyVersion';
import { buildPorygonTypeOrmSourceModule } from '../iocuak/buildPorygonTypeOrmSourceModule';

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
      `@cuaklabs/porygon/${porygonTypeOrmSymbolKeyVersion}/TypeOrmSourceModuleMetadata_${porygonTypeOrmSourceModuleSymbolsMap.alias}`,
    ),
    injects: [],
  };
}
