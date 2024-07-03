export interface Event {
    _id: string,
    username: string,
    teamName: string,
    type: string, // 'meeting', 'task', 'event'
    eventName: string, // name of the event
    date: string, // date of the event
    startTime: string, // start time of the event
    duration: number, // duration of the event in hours
    tasks: string[]; // list of tasks
  }