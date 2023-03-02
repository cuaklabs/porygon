import { ContainerModule, ContainerModuleMetadata } from '@cuaklabs/iocuak';
import { DataSource } from 'typeorm';

import { PorygonTypeOrmEntityModuleSymbolsMap } from '../../models/domain/PorygonTypeOrmEntityModuleSymbolsMap';
import { PorygonTypeOrmSourceModuleSymbolsMap } from '../../models/domain/PorygonTypeOrmSourceModuleSymbolsMap';
import { porygonTypeOrmSymbolKeyVersion } from '../../models/domain/porygonTypeOrmSymbolKeyVersion';
import { buildPorygonTypeOrmEntityModule } from './buildPorygonTypeOrmEntityModule';

export function buildPorygonTypeOrmEntityModuleMetadata<TEntity>(
  porygonTypeOrmSourceModuleSymbolsMap: PorygonTypeOrmSourceModuleSymbolsMap,
  porygonTypeOrmEntityModuleSymbolsMap: PorygonTypeOrmEntityModuleSymbolsMap<TEntity>,
  imports: ContainerModuleMetadata[] = [],
): ContainerModuleMetadata {
  return {
    factory: (dataSource: DataSource): ContainerModule =>
      buildPorygonTypeOrmEntityModule(
        dataSource,
        porygonTypeOrmEntityModuleSymbolsMap,
      ),
    id: Symbol.for(
      `@cuaklabs/porygon/${porygonTypeOrmSymbolKeyVersion}/TypeOrmEntityModuleMetadata_${porygonTypeOrmSourceModuleSymbolsMap.alias}/${porygonTypeOrmEntityModuleSymbolsMap.entityHash}`,
    ),
    imports,
    injects: [porygonTypeOrmSourceModuleSymbolsMap.dataSource],
  };
}
