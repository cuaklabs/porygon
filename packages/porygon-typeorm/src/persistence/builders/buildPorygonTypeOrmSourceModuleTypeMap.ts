import { ModuleTypeToSymbolMap } from '@cuaklabs/porygon-common';

import { PorygonTypeOrmSourceModuleType } from '../models/typeorm/PorygonTypeOrmSourceModuleType';

const VERSION: string = 'v1';

export function buildPorygonTypeOrmSourceModuleTypeMap(
  alias: string = '',
): ModuleTypeToSymbolMap<PorygonTypeOrmSourceModuleType> {
  return {
    dataSource: Symbol.for(`@cuaklabs/porygon/${VERSION}/dataSource_${alias}`),
  };
}
