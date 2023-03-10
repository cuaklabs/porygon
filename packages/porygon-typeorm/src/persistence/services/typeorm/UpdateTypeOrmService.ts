import { ConverterAsync } from '@cuaklabs/porygon-common';
import {
  FindManyOptions,
  ObjectLiteral,
  QueryBuilder,
  Repository,
  UpdateQueryBuilder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { QueryToFindQueryTypeOrmConverter } from '../../converters/typeorm/QueryToFindQueryTypeOrmConverter';
import { QueryWithQueryBuilderToFindQueryTypeOrmConverter } from '../../converters/typeorm/QueryWithQueryBuilderToFindQueryTypeOrmConverter';
import { findManyOptionsToFindOptionsWhere } from '../../utils/typeorm/findManyOptionsToFindOptionsWhere';

export class UpdateTypeOrmService<TModelDb extends ObjectLiteral, TQuery> {
  readonly #repository: Repository<TModelDb>;
  readonly #updateQueryToFindQueryTypeOrmConverter: QueryToFindQueryTypeOrmConverter<
    TModelDb,
    TQuery
  >;
  readonly #updateQueryToSetQueryTypeOrmConverter: ConverterAsync<
    TQuery,
    QueryDeepPartialEntity<TModelDb>
  >;

  constructor(
    repository: Repository<TModelDb>,
    updateQueryToFindQueryTypeOrmConverter: QueryToFindQueryTypeOrmConverter<
      TModelDb,
      TQuery
    >,
    updateQueryToSetQueryTypeOrmConverter: ConverterAsync<
      TQuery,
      QueryDeepPartialEntity<TModelDb>
    >,
  ) {
    this.#repository = repository;
    this.#updateQueryToFindQueryTypeOrmConverter =
      updateQueryToFindQueryTypeOrmConverter;
    this.#updateQueryToSetQueryTypeOrmConverter =
      updateQueryToSetQueryTypeOrmConverter;
  }

  public async update(query: TQuery): Promise<void> {
    const updateQueryBuilder: UpdateQueryBuilder<TModelDb> = this.#repository
      .createQueryBuilder()
      .update();
    const findQueryTypeOrmOrQueryBuilder:
      | FindManyOptions<TModelDb>
      | QueryBuilder<TModelDb> = await (
      this
        .#updateQueryToFindQueryTypeOrmConverter as QueryWithQueryBuilderToFindQueryTypeOrmConverter<
        TModelDb,
        TQuery
      >
    ).convert(query, updateQueryBuilder);
    const setQueryTypeOrm: QueryDeepPartialEntity<TModelDb> =
      await this.#updateQueryToSetQueryTypeOrmConverter.convert(query);

    if (findQueryTypeOrmOrQueryBuilder instanceof QueryBuilder) {
      await (findQueryTypeOrmOrQueryBuilder as UpdateQueryBuilder<TModelDb>)
        .set(setQueryTypeOrm)
        .execute();
    } else {
      await this.#repository.update(
        findManyOptionsToFindOptionsWhere(findQueryTypeOrmOrQueryBuilder),
        setQueryTypeOrm,
      );
    }
  }
}
