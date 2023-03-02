import { PorygonTypeOrmSourceModuleSymbolsMap } from '../../models/domain/PorygonTypeOrmSourceModuleSymbolsMap';
import { porygonTypeOrmSymbolKeyVersion } from '../../models/domain/porygonTypeOrmSymbolKeyVersion';

export function buildPorygonTypeOrmSourceModuleSymbolsMap(
  alias: string = '',
): PorygonTypeOrmSourceModuleSymbolsMap {
  return {
    alias,
    dataSource: Symbol.for(
      `@cuaklabs/porygon/${porygonTypeOrmSymbolKeyVersion}/dataSource_${alias}`,
    ),
  };
}
