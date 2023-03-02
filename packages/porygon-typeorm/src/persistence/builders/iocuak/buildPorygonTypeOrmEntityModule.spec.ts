import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import {
  BindValueOptions,
  ContainerModule,
  ContainerModuleBindingService,
} from '@cuaklabs/iocuak';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';

import { PorygonTypeOrmEntityModuleSymbolsMap } from '../../models/domain/PorygonTypeOrmEntityModuleSymbolsMap';
import { buildPorygonTypeOrmEntityModule } from './buildPorygonTypeOrmEntityModule';

describe(buildPorygonTypeOrmEntityModule.name, () => {
  let dataSourceMock: jest.Mocked<DataSource>;
  let porygonTypeOrmEntityModuleSymbolsMapFixture: PorygonTypeOrmEntityModuleSymbolsMap<unknown>;

  beforeAll(() => {
    dataSourceMock = {
      getRepository: jest.fn(),
    } as Partial<jest.Mocked<DataSource>> as jest.Mocked<DataSource>;
    porygonTypeOrmEntityModuleSymbolsMapFixture = {
      entity: class {},
      entityHash: 'hash',
      repository: Symbol(),
    };
  });

  describe('when called', () => {
    let repositoryFixture: Repository<ObjectLiteral>;
    let containerModule: ContainerModule;

    let result: unknown;

    beforeAll(() => {
      repositoryFixture = Symbol() as unknown as Repository<ObjectLiteral>;

      dataSourceMock.getRepository.mockReturnValueOnce(repositoryFixture);

      containerModule = buildPorygonTypeOrmEntityModule(
        dataSourceMock,
        porygonTypeOrmEntityModuleSymbolsMapFixture,
      );

      result = containerModule;
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should call datasource.getRepository()', () => {
      expect(dataSourceMock.getRepository).toHaveBeenCalledTimes(1);
      expect(dataSourceMock.getRepository).toHaveBeenCalledWith(
        porygonTypeOrmEntityModuleSymbolsMapFixture.entity,
      );
    });

    it('should return a ContainerModule', () => {
      const expected: ContainerModule = {
        load: expect.any(Function) as unknown as (
          containerModuleBindingService: ContainerModuleBindingService,
        ) => void,
      };

      expect(result).toStrictEqual(expected);
    });

    describe('when called load()', () => {
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
        const expected: BindValueOptions = {
          serviceId: porygonTypeOrmEntityModuleSymbolsMapFixture.repository,
          value: repositoryFixture,
        };

        expect(
          containerModuleBindingServiceMock.bindToValue,
        ).toHaveBeenCalledTimes(1);
        expect(
          containerModuleBindingServiceMock.bindToValue,
        ).toHaveBeenCalledWith(expected);
      });
    });
  });
});
