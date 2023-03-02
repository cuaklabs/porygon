import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

jest.mock('./buildPorygonTypeOrmEntityModule');

import {
  ContainerModule,
  ContainerModuleFactoryMetadata,
} from '@cuaklabs/iocuak';
import { DataSource } from 'typeorm';

import { PorygonTypeOrmEntityModuleSymbolsMap } from '../../models/domain/PorygonTypeOrmEntityModuleSymbolsMap';
import { PorygonTypeOrmSourceModuleSymbolsMap } from '../../models/domain/PorygonTypeOrmSourceModuleSymbolsMap';
import { buildPorygonTypeOrmEntityModule } from './buildPorygonTypeOrmEntityModule';
import { buildPorygonTypeOrmEntityModuleMetadata } from './buildPorygonTypeOrmEntityModuleMetadata';

describe(buildPorygonTypeOrmEntityModuleMetadata, () => {
  let porygonTypeOrmSourceModuleSymbolsMapFixture: PorygonTypeOrmSourceModuleSymbolsMap;
  let porygonTypeOrmEntityModuleSymbolsMapFixture: PorygonTypeOrmEntityModuleSymbolsMap<unknown>;

  describe('when called', () => {
    let containerModuleFactoryMetadata: ContainerModuleFactoryMetadata;

    let result: unknown;

    beforeAll(() => {
      porygonTypeOrmSourceModuleSymbolsMapFixture = {
        alias: 'alias',
        dataSource: Symbol(),
      };

      porygonTypeOrmEntityModuleSymbolsMapFixture = {
        entity: class {},
        entityHash: 'hash',
        repository: Symbol(),
      };

      result = buildPorygonTypeOrmEntityModuleMetadata(
        porygonTypeOrmSourceModuleSymbolsMapFixture,
        porygonTypeOrmEntityModuleSymbolsMapFixture,
      );

      containerModuleFactoryMetadata = result as ContainerModuleFactoryMetadata;
    });

    it('should return ContainerModuleFactoryMetadata', () => {
      const expected: ContainerModuleFactoryMetadata = {
        factory: expect.any(Function) as unknown as () => ContainerModule,
        id: expect.any(Symbol) as unknown as symbol,
        imports: [],
        injects: [porygonTypeOrmSourceModuleSymbolsMapFixture.dataSource],
      };

      expect(result).toStrictEqual(expected);
    });

    describe('when called containerModuleFactoryMetadata.factory()', () => {
      let datasourceFixture: DataSource;
      let containerModuleFixture: ContainerModule;
      let result: unknown;

      beforeAll(async () => {
        datasourceFixture = Symbol() as unknown as DataSource;
        containerModuleFixture = {
          load: () => undefined,
        };

        (
          buildPorygonTypeOrmEntityModule as jest.Mock<
            typeof buildPorygonTypeOrmEntityModule
          >
        ).mockReturnValueOnce(containerModuleFixture);

        result = await containerModuleFactoryMetadata.factory(
          datasourceFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call buildPorygonTypeOrmEntityModule()', () => {
        expect(buildPorygonTypeOrmEntityModule).toHaveBeenCalledTimes(1);
        expect(buildPorygonTypeOrmEntityModule).toHaveBeenCalledWith(
          datasourceFixture,
          porygonTypeOrmEntityModuleSymbolsMapFixture,
        );
      });

      it('should return a ContainerModule', () => {
        expect(result).toBe(containerModuleFixture);
      });
    });
  });
});
