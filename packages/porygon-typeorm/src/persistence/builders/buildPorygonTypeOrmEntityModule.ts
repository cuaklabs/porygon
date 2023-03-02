import {
  ContainerModule,
  ContainerModuleBindingService,
} from '@cuaklabs/iocuak';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';

import { PorygonTypeOrmEntityModuleSymbolsMap } from '../models/typeorm/PorygonTypeOrmEntityModuleSymbolsMap';

export function buildPorygonTypeOrmEntityModule<TEntity>(
  dataSource: DataSource,
  porygonTypeOrmEntityModuleSymbolsMap: PorygonTypeOrmEntityModuleSymbolsMap<TEntity>,
): ContainerModule {
  const repository: Repository<ObjectLiteral> = dataSource.getRepository(
    porygonTypeOrmEntityModuleSymbolsMap.entity,
  );

  const containerModule: ContainerModule = {
    load: (containerModuleBindingService: ContainerModuleBindingService) => {
      containerModuleBindingService.bindToValue({
        serviceId: porygonTypeOrmEntityModuleSymbolsMap.repository,
        value: repository,
      });
    },
  };

  return containerModule;
}
