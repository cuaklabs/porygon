import {
  ContainerModule,
  ContainerModuleFactoryMetadata,
  ContainerModuleMetadata,
  ServiceId,
} from '@cuaklabs/iocuak';
import { DataSourceOptions } from 'typeorm';

import { PorygonTypeOrmSourceModuleSymbolsMap } from '../../models/domain/PorygonTypeOrmSourceModuleSymbolsMap';
import { porygonTypeOrmSymbolKeyVersion } from '../../models/domain/porygonTypeOrmSymbolKeyVersion';
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
      `@cuaklabs/porygon/${porygonTypeOrmSymbolKeyVersion}/TypeOrmSourceModuleMetadata_${porygonTypeOrmSourceModuleSymbolsMap.alias}`,
    ),
    injects: [dataSourceOptionsServiceId],
  };

  return porygonTypeOrmSourceModuleMetadata;
}
