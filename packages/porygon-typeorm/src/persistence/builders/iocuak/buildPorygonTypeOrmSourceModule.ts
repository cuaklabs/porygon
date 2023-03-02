import {
  ContainerModule,
  ContainerModuleBindingService,
} from '@cuaklabs/iocuak';
import { DataSource, DataSourceOptions } from 'typeorm';

import { PorygonTypeOrmSourceModuleSymbolsMap } from '../../models/domain/PorygonTypeOrmSourceModuleSymbolsMap';

export async function buildPorygonTypeOrmSourceModule(
  dataSourceOptions: DataSourceOptions,
  porygonTypeOrmSourceModuleSymbolsMap: PorygonTypeOrmSourceModuleSymbolsMap,
): Promise<ContainerModule> {
  const dataSource: DataSource = await buildDatasource(
    porygonTypeOrmSourceModuleSymbolsMap.alias,
    dataSourceOptions,
  );

  const containerModule: ContainerModule = {
    load: (containerModuleBindingService: ContainerModuleBindingService) => {
      containerModuleBindingService.bindToValue({
        serviceId: porygonTypeOrmSourceModuleSymbolsMap.dataSource,
        value: dataSource,
      });
    },
  };

  return containerModule;
}

const ALIAS_TO_DATASOURCE_MAP: Map<string, Promise<DataSource>> = new Map();

async function buildDatasource(
  alias: string,
  dataSourceOptions: DataSourceOptions,
): Promise<DataSource> {
  let dataSourcePromise: Promise<DataSource> | undefined =
    ALIAS_TO_DATASOURCE_MAP.get(alias);

  if (dataSourcePromise === undefined) {
    dataSourcePromise = new DataSource(dataSourceOptions).initialize();

    ALIAS_TO_DATASOURCE_MAP.set(alias, dataSourcePromise);
  }

  return dataSourcePromise;
}
