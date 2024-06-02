// Import the PlayerStats interface, assuming it might have the same or slightly different properties than Player
import { Player } from './Player';

export interface PlayerStats extends Player {
    // Extend Player if additional game-specific properties are needed
}

export interface Game {
    gameDate: string;
    teamName: string;
    rivalTeamName: string;
    playerStats: PlayerStats[];
    myTeamScore:number;
    otherTeamScore:number;
}