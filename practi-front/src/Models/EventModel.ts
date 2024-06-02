export class EventModel {
    id: string;                // Unique identifier for the event
    username: string;          // Username of the user associated with the event
    teamName: string;          // Name of the team
    type: 'game' | 'practice'; // Type of the event, restricted to 'game' or 'practice'
    eventName: string;         // Name of the event
    date: Date;                // Date when the event occurs
    startTime: string;         // Start time of the event (HH:MM format)
    duration: number;          // Duration of the event in minutes
    tasks: string[];           // Array of tasks associated with the event

    constructor(
        id: string,
        username: string,
        teamName: string,
        type: 'game' | 'practice',
        eventName: string,
        date: Date,
        startTime: string,
        duration: number,
        tasks: string[]
    ) {
        this.id = id;
        this.username = username;
        this.teamName = teamName;
        this.type = type;
        this.eventName = eventName;
        this.date = date;
        this.startTime = startTime;
        this.duration = duration;
        this.tasks = tasks;
    }
}
