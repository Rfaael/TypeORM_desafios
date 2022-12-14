import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("games")
      .where(`games.title ILIKE '%${param}%'`)
      .getMany();
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`
      SELECT COUNT(id) FROM games;
    `); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {

    //FOI NECESSARIO MUDAR O REPOSITORY PARA PEGAR A RELATION
    return await getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.games', 'game')
    .where('game.id = :id', { id })
    .getMany();
      // Complete usando query builder
  }
}
