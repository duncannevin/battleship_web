import {ShipModel} from './ship.model';
import {PlayModel} from './play.model';

export interface BoardModel {
  id: string;
  userId: string;
  width: number
  height: number
  createdAt: string
  updatedAt: string
  OpponentId: string|null
  Ships: ShipModel[]
  Plays: PlayModel[]
  Opponent: BoardModel|null
}
