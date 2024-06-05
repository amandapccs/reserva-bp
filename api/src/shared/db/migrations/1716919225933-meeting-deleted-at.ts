import { MigrationInterface, QueryRunner } from 'typeorm';

export class MeetingDeletedAt1716919225933 implements MigrationInterface {
  name = 'MeetingDeletedAt1716919225933';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "meeting" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "meeting" DROP COLUMN "deletedAt"`);
  }
}
