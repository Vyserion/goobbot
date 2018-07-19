import Column from './Column';
import Row from './Row';

export default class Leaderboard {

    name: string;
    columns: Column[];
    rows: Row[];

    constructor() {
        this.columns = [];
        this.rows = [];
    }
}