import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

const maxTodo = 20;

export class SeedRandomTodos1704476532129 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const userRepo = await manager.getRepository('user');
    const todoRepo = await manager.getRepository('todo');
    const users = await userRepo.find({ where: { Random: true } });
    for (const user of users) {
      const UserId = user.Id;
      const count = Math.ceil(Math.random() * maxTodo);
      for (let i = 0; i < count; i++) {
        const todoObj = {
          Task: faker.lorem.sentences(2),
          Completed: faker.datatype.boolean(),
          UserId,
        };
        await todoRepo.save(todoObj);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const userRepo = await manager.getRepository('user');
    const todoRepo = await manager.getRepository('todo');
    const users = await userRepo.find({ where: { Random: true } });
    for (const user of users) {
      await todoRepo.delete({ UserId: user.Id });
    }
  }
}
