import { getJestTsProjectConfig } from '@cuaklabs/porygon-jest-config';

const tsGlobalConfig = getJestTsProjectConfig(
  'All',
  ['/node_modules'],
  '.spec.ts',
);

export default tsGlobalConfig;
