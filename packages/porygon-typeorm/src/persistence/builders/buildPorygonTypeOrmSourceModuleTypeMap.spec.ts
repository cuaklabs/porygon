import { beforeAll, describe, expect, it } from '@jest/globals';

import { ModuleTypeToSymbolMap } from '@cuaklabs/porygon-common';

import { PorygonTypeOrmSourceModuleType } from '../models/typeorm/PorygonTypeOrmSourceModuleType';
import { buildPorygonTypeOrmSourceModuleTypeMap } from './buildPorygonTypeOrmSourceModuleTypeMap';

describe(buildPorygonTypeOrmSourceModuleTypeMap.name, () => {
  describe('when called', () => {
    let result: unknown;

    beforeAll(() => {
      result = buildPorygonTypeOrmSourceModuleTypeMap();
    });

    it('should return a ModuleTypeToSymbolMap<PorygonTypeOrmSourceModuleType>', () => {
      const expected: ModuleTypeToSymbolMap<PorygonTypeOrmSourceModuleType> = {
        dataSource: Symbol.for('@cuaklabs/porygon/v1/dataSource_'),
      };

      expect(result).toStrictEqual(expected);
    });
  });
});
