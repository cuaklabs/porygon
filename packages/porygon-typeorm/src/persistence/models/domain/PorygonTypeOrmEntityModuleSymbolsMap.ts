import { Newable } from '@cuaklabs/iocuak';
import { ModuleTypeToSymbolMap } from '@cuaklabs/porygon-common';

import { PorygonTypeOrmEntityModuleType } from './PorygonTypeOrmEntityModuleType';

export interface PorygonTypeOrmEntityModuleSymbolsMap<TEntity>
  extends ModuleTypeToSymbolMap<PorygonTypeOrmEntityModuleType> {
  entityHash: string;
  entity: Newable<TEntity>;
}
