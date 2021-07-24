import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddContactIdToPhoneTable1627089727676
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'phones',
      new TableColumn({
        name: 'contact_id',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'phones',
      new TableForeignKey({
        name: 'ContactPhones',
        columnNames: ['contact_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contacts',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('phones', 'ContactPhones');
    await queryRunner.dropColumn('phones', 'contact_id');
  }
}
