import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

jest.mock('../../foundation/calculations/hashString');

import { Newable } from '@cuaklabs/iocuak';

import { hashString } from '../../foundation/calculations/hashString';
import { PorygonTypeOrmEntityModuleSymbolsMap } from '../models/typeorm/PorygonTypeOrmEntityModuleSymbolsMap';
import { PorygonTypeOrmSourceModuleSymbolsMap } from '../models/typeorm/PorygonTypeOrmSourceModuleSymbolsMap';
import { buildPorygonTypeOrmEntityModuleSymbolsMap } from './buildPorygonTypeOrmEntityModuleSymbolsMap';

describe(buildPorygonTypeOrmEntityModuleSymbolsMap.name, () => {
  let entityFixture: Newable<unknown>;
  let porygonTypeOrmSourceModuleSymbolsMapFixture: PorygonTypeOrmSourceModuleSymbolsMap;

  describe('when called', () => {
    let entityHashFixture: string;

    let result: unknown;

    beforeAll(() => {
      entityFixture = class Foo {};
      porygonTypeOrmSourceModuleSymbolsMapFixture = {
        alias: 'alias',
        dataSource: Symbol(),
      };

      entityHashFixture = 'entityHashFixture';

      (hashString as jest.Mock<typeof hashString>).mockReturnValueOnce(
        entityHashFixture,
      );

      result = buildPorygonTypeOrmEntityModuleSymbolsMap(
        entityFixture,
        porygonTypeOrmSourceModuleSymbolsMapFixture,
      );
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should call hashString()', () => {
      expect(hashString).toHaveBeenCalledTimes(1);
      expect(hashString).toHaveBeenCalledWith(entityFixture.toString());
    });

    it('should return PorygonTypeOrmEntityModuleSymbolsMap', () => {
      const expected: PorygonTypeOrmEntityModuleSymbolsMap<unknown> = {
        entity: entityFixture,
        entityHash: entityHashFixture,
        repository: expect.any(Symbol) as unknown as symbol,
      };

      expect(result).toStrictEqual(expected);
    });
  });
});
