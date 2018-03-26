import Column from './Column';

export default class Leaderboard {

    name: string;
    columns: Column[];

    constructor() {
        this.columns = [];
    }
}