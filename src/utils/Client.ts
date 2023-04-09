import { Client, Collection } from "discord.js"

export default class MyClient extends Client {
  commands: Collection<any, any>
  constructor(options: any) {
   super(options)
   this.commands = new Collection();
  }
}
