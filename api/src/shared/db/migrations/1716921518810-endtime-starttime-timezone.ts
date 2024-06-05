import { MigrationInterface, QueryRunner } from 'typeorm';

export class EndtimeStarttimeTimezone1716921518810
  implements MigrationInterface
{
  name = 'EndtimeStarttimeTimezone1716921518810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "meeting" DROP COLUMN "startTime"`);
    await queryRunner.query(
      `ALTER TABLE "meeting" ADD "startTime" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "meeting" DROP COLUMN "endTime"`);
    await queryRunner.query(
      `ALTER TABLE "meeting" ADD "endTime" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "meeting" DROP COLUMN "endTime"`);
    await queryRunner.query(
      `ALTER TABLE "meeting" ADD "endTime" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "meeting" DROP COLUMN "startTime"`);
    await queryRunner.query(
      `ALTER TABLE "meeting" ADD "startTime" TIMESTAMP NOT NULL`,
    );
  }
}
