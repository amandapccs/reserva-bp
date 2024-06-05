import { MigrationInterface, QueryRunner } from 'typeorm';

export class Meeting1715621723006 implements MigrationInterface {
  name = 'Meeting1715621723006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "meeting" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_dccaf9e4c0e39067d82ccc7bb83" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "meeting_participants_user" ("meetingId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_6b5bfbce28da2d6d70553057c35" PRIMARY KEY ("meetingId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_00e85b1ef8ba02143d4afda01c" ON "meeting_participants_user" ("meetingId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_888360c104337e11fbfe4eda83" ON "meeting_participants_user" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_participants_user" ADD CONSTRAINT "FK_00e85b1ef8ba02143d4afda01c5" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_participants_user" ADD CONSTRAINT "FK_888360c104337e11fbfe4eda837" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "meeting_participants_user" DROP CONSTRAINT "FK_888360c104337e11fbfe4eda837"`,
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_participants_user" DROP CONSTRAINT "FK_00e85b1ef8ba02143d4afda01c5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_888360c104337e11fbfe4eda83"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_00e85b1ef8ba02143d4afda01c"`,
    );
    await queryRunner.query(`DROP TABLE "meeting_participants_user"`);
    await queryRunner.query(`DROP TABLE "meeting"`);
  }
}
