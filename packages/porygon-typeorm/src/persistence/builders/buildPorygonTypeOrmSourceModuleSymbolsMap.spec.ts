import { beforeAll, describe, expect, it } from '@jest/globals';

import { PorygonTypeOrmSourceModuleSymbolsMap } from '../models/typeorm/PorygonTypeOrmSourceModuleSymbolsMap';
import { buildPorygonTypeOrmSourceModuleSymbolsMap } from './buildPorygonTypeOrmSourceModuleSymbolsMap';

describe(buildPorygonTypeOrmSourceModuleSymbolsMap.name, () => {
  describe('when called', () => {
    let result: unknown;

    beforeAll(() => {
      result = buildPorygonTypeOrmSourceModuleSymbolsMap();
    });

    it('should return a PorygonTypeOrmSourceModuleSymbolsMap', () => {
      const expected: PorygonTypeOrmSourceModuleSymbolsMap = {
        alias: '',
        dataSource: Symbol.for('@cuaklabs/porygon/v1/dataSource_'),
      };

      expect(result).toStrictEqual(expected);
    });
  });
});
