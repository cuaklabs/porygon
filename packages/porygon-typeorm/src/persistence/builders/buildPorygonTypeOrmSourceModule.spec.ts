import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

jest.mock('typeorm');

import {
  BindValueOptions,
  ContainerModule,
  ContainerModuleBindingService,
} from '@cuaklabs/iocuak';
import { DataSource, DataSourceOptions } from 'typeorm';

import { PorygonTypeOrmSourceModuleSymbolsMap } from '../models/domain/PorygonTypeOrmSourceModuleSymbolsMap';
import { buildPorygonTypeOrmSourceModule } from './buildPorygonTypeOrmSourceModule';

describe(buildPorygonTypeOrmSourceModule.name, () => {
  let dataSourceOptionsFixture: DataSourceOptions;

  beforeAll(() => {
    dataSourceOptionsFixture = Symbol() as unknown as DataSourceOptions;
  });

  describe('having a PorygonTypeOrmSourceModuleSymbolsMap', () => {
    let porygonTypeOrmSourceModuleSymbolsMapFixture: PorygonTypeOrmSourceModuleSymbolsMap;

    beforeAll(() => {
      porygonTypeOrmSourceModuleSymbolsMapFixture = {
        alias: 'alias',
        dataSource: Symbol(),
      };
    });

    describe('when called', () => {
      let dataSourceFixture: DataSource;
      let containerModule: ContainerModule;
      let result: unknown;

      beforeAll(async () => {
        dataSourceFixture = {
          initialize: jest.fn().mockReturnThis(),
        } as Partial<DataSource> as DataSource;

        (DataSource as jest.Mock).mockReturnValueOnce(dataSourceFixture);

        containerModule = await buildPorygonTypeOrmSourceModule(
          dataSourceOptionsFixture,
          porygonTypeOrmSourceModuleSymbolsMapFixture,
        );

        result = containerModule;
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call new DataSource', () => {
        expect(DataSource).toHaveBeenCalledTimes(1);
        expect(DataSource).toHaveBeenCalledWith(dataSourceOptionsFixture);
      });

      it('should call dataSource.initialize()', () => {
        expect(dataSourceFixture.initialize).toHaveBeenCalledTimes(1);
        expect(dataSourceFixture.initialize).toHaveBeenCalledWith();
      });

      it('should return a ContainerModule', () => {
        const expected: ContainerModule = {
          load: expect.any(Function) as unknown as (
            containerModuleBindingService: ContainerModuleBindingService,
          ) => void,
        };

        expect(result).toStrictEqual(expected);
      });

      describe('when called containerModule.load()', () => {
        let containerModuleBindingServiceMock: jest.Mocked<ContainerModuleBindingService>;

        beforeAll(() => {
          containerModuleBindingServiceMock = {
            bindToValue: jest.fn(),
          } as Partial<
            jest.Mocked<ContainerModuleBindingService>
          > as jest.Mocked<ContainerModuleBindingService>;

          containerModule.load(containerModuleBindingServiceMock);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call containerModuleBindingService.bindToValue()', () => {
          const bindValueOptions: BindValueOptions = {
            serviceId: porygonTypeOrmSourceModuleSymbolsMapFixture.dataSource,
            value: dataSourceFixture,
          };

          expect(
            containerModuleBindingServiceMock.bindToValue,
          ).toHaveBeenCalledTimes(1);
          expect(
            containerModuleBindingServiceMock.bindToValue,
          ).toHaveBeenCalledWith(bindValueOptions);
        });
      });
    });
  });

  describe('having another PorygonTypeOrmSourceModuleSymbolsMap', () => {
    let porygonTypeOrmSourceModuleSymbolsMapFixture: PorygonTypeOrmSourceModuleSymbolsMap;

    beforeAll(() => {
      porygonTypeOrmSourceModuleSymbolsMapFixture = {
        alias: 'another-alias',
        dataSource: Symbol(),
      };
    });

    describe('when called twice', () => {
      let dataSourceFixture: DataSource;
      let containerModule: ContainerModule;
      let result: unknown;

      beforeAll(async () => {
        dataSourceFixture = {
          initialize: jest.fn().mockReturnThis(),
        } as Partial<DataSource> as DataSource;

        (DataSource as jest.Mock).mockReturnValueOnce(dataSourceFixture);

        containerModule = await buildPorygonTypeOrmSourceModule(
          dataSourceOptionsFixture,
          porygonTypeOrmSourceModuleSymbolsMapFixture,
        );

        await buildPorygonTypeOrmSourceModule(
          dataSourceOptionsFixture,
          porygonTypeOrmSourceModuleSymbolsMapFixture,
        );

        result = containerModule;
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call new DataSource', () => {
        expect(DataSource).toHaveBeenCalledTimes(1);
        expect(DataSource).toHaveBeenCalledWith(dataSourceOptionsFixture);
      });

      it('should call dataSource.initialize()', () => {
        expect(dataSourceFixture.initialize).toHaveBeenCalledTimes(1);
        expect(dataSourceFixture.initialize).toHaveBeenCalledWith();
      });

      it('should return a ContainerModule', () => {
        const expected: ContainerModule = {
          load: expect.any(Function) as unknown as (
            containerModuleBindingService: ContainerModuleBindingService,
          ) => void,
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });
});
