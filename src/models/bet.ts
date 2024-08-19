import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Bet extends Model {
    public id!: number;
    public team!: string;
    public opponent!: string;
    public amount!: number;
    public odds!: string;  // Changed from number to string
    public description?: string;
    public date!: Date;
    public result!: 'win' | 'loss' | 'pending';
    public betType!: string;
    public ticketCost!: number;
    public payout!: number;
}

Bet.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    team: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    opponent: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    odds: {
        type: DataTypes.STRING,  // Changed from FLOAT to STRING
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    result: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    betType: {
        type: DataTypes.STRING,  // e.g., OVR or PLB
        allowNull: false,
    },
    ticketCost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    payout: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'bets',
});

export default Bet;
