import { ContainerModule, ContainerModuleMetadata } from '@cuaklabs/iocuak';
import { DataSource } from 'typeorm';

import { PorygonTypeOrmEntityModuleSymbolsMap } from '../models/typeorm/PorygonTypeOrmEntityModuleSymbolsMap';
import { PorygonTypeOrmSourceModuleSymbolsMap } from '../models/typeorm/PorygonTypeOrmSourceModuleSymbolsMap';
import { buildPorygonTypeOrmEntityModule } from './buildPorygonTypeOrmEntityModule';

const VERSION: string = 'v1';

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
      `@cuaklabs/porygon/${VERSION}/TypeOrmEntityModuleMetadata_${porygonTypeOrmSourceModuleSymbolsMap.alias}/${porygonTypeOrmEntityModuleSymbolsMap.entityHash}`,
    ),
    imports,
    injects: [porygonTypeOrmSourceModuleSymbolsMap.dataSource],
  };
}
