import { Newable } from '@cuaklabs/iocuak';
import { ModuleTypeToSymbolMap } from '@cuaklabs/porygon-common';

import { hashString } from '../../foundation/calculations/hashString';
import { PorygonTypeOrmEntityModuleSymbolsMap } from '../models/domain/PorygonTypeOrmEntityModuleSymbolsMap';
import { PorygonTypeOrmEntityModuleType } from '../models/domain/PorygonTypeOrmEntityModuleType';
import { PorygonTypeOrmSourceModuleSymbolsMap } from '../models/domain/PorygonTypeOrmSourceModuleSymbolsMap';
import { porygonTypeOrmSymbolKeyVersion } from '../models/domain/porygonTypeOrmSymbolKeyVersion';

export function buildPorygonTypeOrmEntityModuleSymbolsMap<TEntity>(
  entity: Newable<TEntity>,
  porygonTypeOrmSourceModuleSymbolsMap: PorygonTypeOrmSourceModuleSymbolsMap,
): PorygonTypeOrmEntityModuleSymbolsMap<TEntity> {
  const entityHash: string = hashString(entity.toString());
  const dataSourceAlias: string = porygonTypeOrmSourceModuleSymbolsMap.alias;

  return {
    entity,
    entityHash,
    ...buildPorygonTypeOrmEntityModuleTypeSymbolsMap(
      dataSourceAlias,
      entityHash,
    ),
  };
}

function buildPorygonTypeOrmEntityModuleSymbol(
  dataSourceAlias: string,
  moduleType: string,
  entityHash: string,
): symbol {
  return Symbol(
    `@cuaklabs/porygon/${porygonTypeOrmSymbolKeyVersion}/dataSource_${dataSourceAlias}/${moduleType}_${entityHash}`,
  );
}

function buildPorygonTypeOrmEntityModuleTypeSymbolsMap(
  dataSourceAlias: string,
  entityHash: string,
): ModuleTypeToSymbolMap<PorygonTypeOrmEntityModuleType> {
  return Object.fromEntries(
    Object.values(PorygonTypeOrmEntityModuleType).map(
      (porygonTypeOrmEntityModuleType: PorygonTypeOrmEntityModuleType) => [
        porygonTypeOrmEntityModuleType,
        buildPorygonTypeOrmEntityModuleSymbol(
          dataSourceAlias,
          porygonTypeOrmEntityModuleType,
          entityHash,
        ),
      ],
    ),
  ) as ModuleTypeToSymbolMap<PorygonTypeOrmEntityModuleType>;
}
