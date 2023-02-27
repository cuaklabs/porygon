import { ModuleTypeToSymbolMap } from '@cuaklabs/porygon-common';

import { PorygonTypeOrmSourceModuleType } from './PorygonTypeOrmSourceModuleType';

export interface PorygonTypeOrmSourceModuleSymbolsMap
  extends ModuleTypeToSymbolMap<PorygonTypeOrmSourceModuleType> {
  alias: string;
}
