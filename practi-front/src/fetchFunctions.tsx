// fetchFunctions.tsx
export const fetchTeams = async (club: string, token: string, master: boolean): Promise<any[]> => {
    const url = master
      ? `https://practi-web.onrender.com/api/teams/club?clubName=${encodeURIComponent(club)}`
      : 'https://practi-web.onrender.com/api/teams';
  
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch teams');
      return await response.json();
    } catch (error) {
      console.error('Error fetching teams:', error);
      return [];
    }
  };
  
  export const fetchGames = async (token: string, master: boolean,club: string): Promise<any[]> => {
    console.log(master);
    const url = master
      ? `https://practi-web.onrender.com/api/games/club?clubName=${encodeURIComponent(club)}`
      : 'https://practi-web.onrender.com/api/games/coach';
  
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch games');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching games:', error);
      return [];
    }
  };
  export const deleteGameByDetails = async (gameDate: string, teamName: string, rivalTeamName: string, token: string): Promise<void> => {
    const url = `https://practi-web.onrender.com/api/games/date/${gameDate}/team/${teamName}/rivalTeam/${rivalTeamName}`;
  
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete game.');
      }
    } catch (error) {
      console.error('Error deleting game:', error);
      throw error;
    }
  };
  export const fetchEventById = async (eventId: string, token: string) => {
    const url = `https://practi-web.onrender.com/api/events/id/${eventId}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch event with ID ${eventId}`);
      }
  
      const eventData = await response.json();
      return eventData;
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  };
  
  export const updateEventById = async (eventId: string, token: string, updatedEvent: any) => {
    const url = `https://practi-web.onrender.com/api/events/${eventId}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEvent),
      });
  
      if (!response.ok) {
        const result = await response.json();
        throw result.error || 'Error updating event';
      }
  
      return true; // Indicates a successful update
    } catch (error) {
      console.error('Failed to update event:', error);
      throw error;
    }
  };

  export const deleteEventById = async (eventId: string, token: string) => {
    const url = `https://practi-web.onrender.com/api/events/${eventId}`;
  
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const result = await response.json();
        throw result.error || 'Error deleting event';
      }
  
      return true; // Indicates success
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  };

  export const createNewEvent = async (token: string, newEvent: any) => {
    const url = 'https://practi-web.onrender.com/api/events';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });
  
      if (!response.ok) {
        const result = await response.json();
        throw result.error || 'Error creating event';
      }
  
      return true; // Indicates success
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  };
  export const createNewGameEvent = async (token: string, newEvent: any) => {
    const url = 'https://practi-web.onrender.com/api/events';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });
  
      if (!response.ok) {
        const result = await response.json();
        throw result.error || 'Error creating event';
      }
  
      return true; // Indicates success
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  };

  export const fetchEvents = async (token: string): Promise<any[]> => {
    const url = 'https://practi-web.onrender.com/api/events';
  
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch events.');
      }
  
      const eventsData = await response.json();
      return eventsData;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  };
  
  export const fetchGameDetails = async (
    token: string,
    eventDate: string,
    teamName: string,
    rivalTeamName: string
  ): Promise<any> => {
    const url = `https://practi-web.onrender.com/api/games/date/${eventDate}/team/${teamName}/rivalTeam/${rivalTeamName}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.warn(`Game not found for event: ${eventDate} - ${teamName} vs ${rivalTeamName}`);
        return null;
      }
  
      const gameData = await response.json();
      return gameData[0] || null;
    } catch (error) {
      console.error('Error fetching game details:', error);
      throw error;
    }
  };