import {Injectable} from '@nestjs/common';
import {redis} from "../redis";
import RoomModel from "./room.model";
import InputModel from "../common/input.model";

@Injectable()
export class RoomService {
  async addRoom(payload: InputModel): Promise<RoomModel[]> {
    const room = new RoomModel(payload.value);

    try {
      await redis.sadd('room', JSON.stringify(room));
    } catch (error) {
      console.log('error.message', error.message);
    }

    return this.getRooms();
  }

  async getRooms(): Promise<RoomModel[]> {
    try {
      const rooms = await redis.smembers('room');

      return rooms.map((room: string) => JSON.parse(room));
    } catch (error) {
      console.log('error.message', error.message);
    }
  }

  async getRoom(roomId: string): Promise<RoomModel> {
    const room = (await this.getRooms()).filter((room: RoomModel) => room.id === roomId);

    if (!room) {
      throw Error("Room does not exists");
    }

    return room[0];
  }

  async removeUserFromRoom (payload: any): Promise<void> {
    await redis.hdel('user_room', payload);
  }
}

