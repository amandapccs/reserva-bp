import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserPassword1715885946860 implements MigrationInterface {
  name = 'UserPassword1715885946860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" text NOT NULL DEFAULT 'secretpassword'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
