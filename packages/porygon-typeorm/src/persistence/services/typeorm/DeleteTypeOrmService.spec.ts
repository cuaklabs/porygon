import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import {
  FindManyOptions,
  FindOptionsWhere,
  QueryBuilder,
  Repository,
  WhereExpressionBuilder,
} from 'typeorm';

jest.mock('../../utils/typeorm/findManyOptionsToFindOptionsWhere');

import { QueryToFindQueryTypeOrmConverter } from '../../converters/typeorm/QueryToFindQueryTypeOrmConverter';
import { findManyOptionsToFindOptionsWhere } from '../../utils/typeorm/findManyOptionsToFindOptionsWhere';
import { DeleteTypeOrmService } from './DeleteTypeOrmService';

interface ModelTest {
  foo: unknown;
}

interface QueryTest {
  fooValue: unknown;
}

describe(DeleteTypeOrmService.name, () => {
  let queryBuilderMock: jest.Mocked<
    QueryBuilder<ModelTest> & WhereExpressionBuilder
  >;
  let repositoryMock: jest.Mocked<Repository<ModelTest>>;
  let queryToQueryTypeOrmConverterMock: jest.Mocked<
    QueryToFindQueryTypeOrmConverter<ModelTest, QueryTest>
  >;
  let deleteTypeOrmAdapter: DeleteTypeOrmService<ModelTest, QueryTest>;

  beforeAll(() => {
    queryBuilderMock = Object.assign(
      Object.create(QueryBuilder.prototype) as QueryBuilder<ModelTest>,
      {
        delete: jest.fn().mockReturnThis(),
        execute: jest.fn(),
      } as Partial<
        jest.Mocked<QueryBuilder<ModelTest> & WhereExpressionBuilder>
      > as jest.Mocked<QueryBuilder<ModelTest> & WhereExpressionBuilder>,
    );

    repositoryMock = {
      createQueryBuilder: jest.fn().mockReturnValue(queryBuilderMock),
      delete: jest.fn(),
    } as Partial<jest.Mocked<Repository<ModelTest>>> as jest.Mocked<
      Repository<ModelTest>
    >;

    queryToQueryTypeOrmConverterMock = {
      convert: jest.fn(),
    } as unknown as jest.Mocked<
      QueryToFindQueryTypeOrmConverter<ModelTest, QueryTest>
    >;

    deleteTypeOrmAdapter = new DeleteTypeOrmService(
      repositoryMock,
      queryToQueryTypeOrmConverterMock,
    );
  });

  describe('.delete', () => {
    describe('when called and queryToQueryTypeOrmConverter returns FindManyOptions<ModelTest>', () => {
      let queryFixture: QueryTest;
      let queryTypeOrmFixture: FindManyOptions<ModelTest>;
      let findOptionsWhereFixture: FindOptionsWhere<ModelTest>;

      beforeAll(async () => {
        queryFixture = {
          fooValue: 'foo-value',
        };

        findOptionsWhereFixture = {};

        queryTypeOrmFixture = {
          where: findOptionsWhereFixture,
        };

        (
          queryToQueryTypeOrmConverterMock.convert as jest.Mock<
            (query: QueryTest) => Promise<FindManyOptions<ModelTest>>
          >
        ).mockResolvedValueOnce(queryTypeOrmFixture);

        (
          findManyOptionsToFindOptionsWhere as jest.Mock<
            typeof findManyOptionsToFindOptionsWhere
          >
        ).mockReturnValueOnce(findOptionsWhereFixture);

        await deleteTypeOrmAdapter.delete(queryFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call repository.createQueryBuilder()', () => {
        expect(repositoryMock.createQueryBuilder).toHaveBeenCalledTimes(1);
        expect(repositoryMock.createQueryBuilder).toHaveBeenCalledWith();
      });

      it('should call queryBuilder.delete()', () => {
        expect(queryBuilderMock.delete).toHaveBeenCalledTimes(1);
        expect(queryBuilderMock.delete).toHaveBeenCalledWith();
      });

      it('should call queryToQueryTypeOrmConverter.convert()', () => {
        expect(queryToQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(
          1,
        );
        expect(queryToQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(
          queryFixture,
          queryBuilderMock,
        );
      });

      it('should call findManyOptionsToFindOptionsWhere()', () => {
        expect(findManyOptionsToFindOptionsWhere).toHaveBeenCalledTimes(1);
        expect(findManyOptionsToFindOptionsWhere).toHaveBeenCalledWith(
          queryTypeOrmFixture,
        );
      });

      it('should call repositoryMock.delete()', () => {
        expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
        expect(repositoryMock.delete).toHaveBeenCalledWith(
          findOptionsWhereFixture,
        );
      });
    });

    describe('when called and queryToQueryTypeOrmConverter returns QueryBuilder<ModelTest>', () => {
      let queryFixture: QueryTest;

      beforeAll(async () => {
        queryFixture = {
          fooValue: 'foo-value',
        };

        (
          queryToQueryTypeOrmConverterMock.convert as jest.Mock<
            (
              query: QueryTest,
              context: QueryBuilder<ModelTest> & WhereExpressionBuilder,
            ) => Promise<QueryBuilder<ModelTest> & WhereExpressionBuilder>
          >
        ).mockResolvedValueOnce(queryBuilderMock);

        await deleteTypeOrmAdapter.delete(queryFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call repository.createQueryBuilder()', () => {
        expect(repositoryMock.createQueryBuilder).toHaveBeenCalledTimes(1);
        expect(repositoryMock.createQueryBuilder).toHaveBeenCalledWith();
      });

      it('should call queryBuilder.delete()', () => {
        expect(queryBuilderMock.delete).toHaveBeenCalledTimes(1);
        expect(queryBuilderMock.delete).toHaveBeenCalledWith();
      });

      it('should call queryToQueryTypeOrmConverter.convert()', () => {
        expect(queryToQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(
          1,
        );
        expect(queryToQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(
          queryFixture,
          queryBuilderMock,
        );
      });

      it('should call queryBuilder.execute()', () => {
        expect(queryBuilderMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBuilderMock.execute).toHaveBeenCalledWith();
      });
    });
  });
});
