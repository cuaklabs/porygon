import { PorygonTypeOrmSourceModuleSymbolsMap } from '../models/domain/PorygonTypeOrmSourceModuleSymbolsMap';

const VERSION: string = 'v1';

export function buildPorygonTypeOrmSourceModuleSymbolsMap(
  alias: string = '',
): PorygonTypeOrmSourceModuleSymbolsMap {
  return {
    alias,
    dataSource: Symbol.for(`@cuaklabs/porygon/${VERSION}/dataSource_${alias}`),
  };
}
