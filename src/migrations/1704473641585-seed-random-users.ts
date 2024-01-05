import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const userCount = 20;
const PassWord = bcrypt.hashSync('T0pS3cret!', 10);

export class SeedRandomUsers1704473641585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const userRepo = await manager.getRepository('user');
    for (let i = 0; i < userCount; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const userObj = {
        UserName: faker.internet.userName({ firstName, lastName }),
        Email: faker.internet.email({ firstName, lastName }),
        Random: true,
        PassWord,
      };
      await userRepo.save(userObj);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const userRepo = await manager.getRepository('user');
    await userRepo.delete({ Random: true });
  }
}
