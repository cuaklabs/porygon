import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

jest.mock('./buildPorygonTypeOrmSourceModule');

import {
  ContainerModule,
  ContainerModuleFactoryMetadata,
  ServiceId,
} from '@cuaklabs/iocuak';
import { DataSourceOptions } from 'typeorm';

import { PorygonTypeOrmSourceModuleSymbolsMap } from '../models/typeorm/PorygonTypeOrmSourceModuleSymbolsMap';
import { buildPorygonTypeOrmSourceModule } from './buildPorygonTypeOrmSourceModule';
import { buildPorygonTypeOrmSourceModuleMetadataAsync } from './buildPorygonTypeOrmSourceModuleMetadataAsync';

describe(buildPorygonTypeOrmSourceModuleMetadataAsync.name, () => {
  describe('when called', () => {
    let dataSourceOptionsServiceIdFixture: ServiceId;
    let porygonTypeOrmSourceModuleSymbolsMapFixture: PorygonTypeOrmSourceModuleSymbolsMap;

    let containerModuleMetadata: ContainerModuleFactoryMetadata;

    let result: unknown;

    beforeAll(() => {
      dataSourceOptionsServiceIdFixture = Symbol();
      porygonTypeOrmSourceModuleSymbolsMapFixture = {
        alias: 'alias',
      } as Partial<PorygonTypeOrmSourceModuleSymbolsMap> as PorygonTypeOrmSourceModuleSymbolsMap;

      result = buildPorygonTypeOrmSourceModuleMetadataAsync(
        dataSourceOptionsServiceIdFixture,
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
        injects: [dataSourceOptionsServiceIdFixture],
      };

      expect(result).toStrictEqual(expected);
    });

    describe('when called factory()', () => {
      let dataSourceOptionsFixture: DataSourceOptions;

      beforeAll(async () => {
        dataSourceOptionsFixture = Symbol() as unknown as DataSourceOptions;

        await containerModuleMetadata.factory(dataSourceOptionsFixture);
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
