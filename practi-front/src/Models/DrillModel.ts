// DrillModel.ts
export class DrillModel {
    drillNumber: number;
    drillId: string;
    date: Date;
    missionName: string;
    tries?: number;
    successes: number;
    user: string;
    drillName: string;
    topic: string;
    isSingle: boolean;
    opponentScore?: number;
    opponentName?: string;
    target?: number;
};  