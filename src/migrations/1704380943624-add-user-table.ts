import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class AddUserTable1704380943624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          // base model
          {
            name: 'Id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'Created',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'Updated',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'Version',
            type: 'int',
            length: '11',
            isNullable: false,
            default: '1',
          },
          {
            name: 'IsDeleted',
            type: 'boolean',
            default: false,
          },
          // user fields
          {
            name: 'UserName',
            type: 'varchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'PassWord',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'Email',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
    const table = await queryRunner.getTable('user');
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UserName');
    if (!indexKey1) {
      await queryRunner.createIndex(
        'user',
        new TableIndex({
          name: 'IDX-UserName',
          columnNames: ['UserName'],
          isUnique: true,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UserName');
    if (indexKey1) {
      await queryRunner.dropIndex('user', 'IDX-UserName');
    }
    await queryRunner.dropTable(
      new Table({
        name: 'user',
      }),
      true,
    );
  }
}
