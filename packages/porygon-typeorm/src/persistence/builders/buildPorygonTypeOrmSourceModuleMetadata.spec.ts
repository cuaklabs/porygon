import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

jest.mock('./buildPorygonTypeOrmSourceModule');

import {
  ContainerModule,
  ContainerModuleFactoryMetadata,
} from '@cuaklabs/iocuak';
import { DataSourceOptions } from 'typeorm';

import { PorygonTypeOrmSourceModuleSymbolsMap } from '../models/typeorm/PorygonTypeOrmSourceModuleSymbolsMap';
import { buildPorygonTypeOrmSourceModule } from './buildPorygonTypeOrmSourceModule';
import { buildPorygonTypeOrmSourceModuleMetadata } from './buildPorygonTypeOrmSourceModuleMetadata';

describe(buildPorygonTypeOrmSourceModuleMetadata.name, () => {
  describe('when called', () => {
    let dataSourceOptionsFixture: DataSourceOptions;
    let porygonTypeOrmSourceModuleSymbolsMapFixture: PorygonTypeOrmSourceModuleSymbolsMap;

    let containerModuleMetadata: ContainerModuleFactoryMetadata;

    let result: unknown;

    beforeAll(() => {
      dataSourceOptionsFixture = Symbol() as unknown as DataSourceOptions;

      porygonTypeOrmSourceModuleSymbolsMapFixture = {
        alias: 'alias',
      } as Partial<PorygonTypeOrmSourceModuleSymbolsMap> as PorygonTypeOrmSourceModuleSymbolsMap;

      result = buildPorygonTypeOrmSourceModuleMetadata(
        dataSourceOptionsFixture,
        porygonTypeOrmSourceModuleSymbolsMapFixture,
      );

      containerModuleMetadata = result as ContainerModuleFactoryMetadata;
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should return a ContainerModuleFactoryMetadata', () => {
      const expected: ContainerModuleFactoryMetadata = {
        factory: expect.any(
          Function,
        ) as unknown as () => Promise<ContainerModule>,
        id: Symbol.for(
          `@cuaklabs/porygon/v1/TypeOrmSourceModuleMetadata_${porygonTypeOrmSourceModuleSymbolsMapFixture.alias}`,
        ),
        injects: [],
      };

      expect(result).toStrictEqual(expected);
    });

    describe('when called factory()', () => {
      beforeAll(async () => {
        await containerModuleMetadata.factory();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call buildPorygonTypeOrmSourceModule()', () => {
        expect(buildPorygonTypeOrmSourceModule).toHaveBeenCalledTimes(1);
        expect(buildPorygonTypeOrmSourceModule).toHaveBeenCalledWith(
          dataSourceOptionsFixture,
          porygonTypeOrmSourceModuleSymbolsMapFixture,
        );
      });
    });
  });
});
