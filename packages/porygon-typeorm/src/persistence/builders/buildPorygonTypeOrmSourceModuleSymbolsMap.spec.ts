import { beforeAll, describe, expect, it } from '@jest/globals';

import { PorygonTypeOrmSourceModuleSymbolsMap } from '../models/typeorm/PorygonTypeOrmSourceModuleSymbolsMap';
import { buildPorygonTypeOrmSourceModuleSymbolsMap } from './buildPorygonTypeOrmSourceModuleSymbolsMap';

describe(buildPorygonTypeOrmSourceModuleSymbolsMap.name, () => {
  describe('having an alias', () => {
    let aliasFixture: string;

    beforeAll(() => {
      aliasFixture = 'alias';
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = buildPorygonTypeOrmSourceModuleSymbolsMap(aliasFixture);
      });

      it('should return a PorygonTypeOrmSourceModuleSymbolsMap', () => {
        const expected: PorygonTypeOrmSourceModuleSymbolsMap = {
          alias: aliasFixture,
          dataSource: Symbol.for(
            `@cuaklabs/porygon/v1/dataSource_${aliasFixture}`,
          ),
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });

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
