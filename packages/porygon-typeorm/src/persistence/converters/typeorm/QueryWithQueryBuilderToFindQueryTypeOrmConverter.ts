import { ConverterAsync } from '@cuaklabs/porygon-common';
import {
  FindManyOptions,
  ObjectLiteral,
  QueryBuilder,
  WhereExpressionBuilder,
} from 'typeorm';

export type QueryWithQueryBuilderToFindQueryTypeOrmConverter<
  TModelDb extends ObjectLiteral,
  TQuery,
> = ConverterAsync<
  TQuery,
  FindManyOptions<TModelDb> | (QueryBuilder<TModelDb> & WhereExpressionBuilder),
  QueryBuilder<TModelDb> & WhereExpressionBuilder
>;
