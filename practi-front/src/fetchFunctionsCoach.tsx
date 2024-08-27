import { Player } from "./views/InGameStats/Player";
import { GameForPlayer } from "./views/InGameStats/gameForPlayer";

// fetchFunctionsCoach.tsx
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

  export const fetchTeamsWithPlayers = async (token: string, club: string, master: boolean): Promise<any[]> => {
    const url = master
      ? `https://practi-web.onrender.com/api/teams/club?clubName=${encodeURIComponent(club)}`
      : 'https://practi-web.onrender.com/api/teams';
  
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) throw new Error('Failed to fetch teams');
  
      const teamsData = await response.json();
  
      const teamsWithPlayers = await Promise.all(
        teamsData.map(async (team: { teamName: string }) => {
          const playersResponse = await fetch('https://practi-web.onrender.com/api/teams/players', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ teamName: team.teamName }),
          });
  
          const playersData = await playersResponse.json();
          return {
            teamName: team.teamName,
            players: playersData.players || [],
          };
        })
      );
  
      return teamsWithPlayers;
    } catch (error) {
      console.error('Error fetching teams and players:', error);
      throw error;
    }
  };

  export const fetchPlayersForTeam = async (teamName: string, token: string): Promise<Player[]> => {
    const url = 'https://practi-web.onrender.com/api/teams/players';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch players.');
      }
  
      const data = await response.json();
      return data.players.map((player: { fullName: string }) => ({
        name: player.fullName,
        score: 0,
        assists: 0,
        rebounds: 0,
      }));
    } catch (error) {
      console.error('Error fetching players:', error);
      throw error;
    }
  };
  
  
  
  export const sendDrillAssignments = async (token: string, assignments: any[]): Promise<void> => {
    try {
      for (const assignment of assignments) {
        await fetch(`https://practi-web.onrender.com/api/SendDrills/${assignment.drillId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user: assignment.user,
            drillName: assignment.drillName,
            topic: assignment.topic,
          }),
        });
      }
    } catch (error) {
      console.error('Error sending drill assignments:', error);
      throw error;
    }
  };
  
  export const fetchGames = async (token: string, master: boolean,club: string): Promise<any[]> => {
    const url = master
      ? `https://practi-web.onrender.com/api/games/club?clubName=${encodeURIComponent(club)}`
      : 'https://practi-web.onrender.com/api/games/coach';
  
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch games');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching games:', error);
      return [];
    }
  };

  export const saveGameDetails = async (gameDetails: any, token: string): Promise<void> => {
    const url = 'https://practi-web.onrender.com/api/games';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameDetails),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save game details.');
      }
    } catch (error) {
      console.error('Error saving game details:', error);
      throw error;
    }
  };
  
  export const deletePreviousGame = async (gameDate: string, teamName: string, rivalTeamName: string, token: string): Promise<void> => {
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
        throw new Error('Failed to delete previous game.');
      }
    } catch (error) {
      console.error('Error deleting previous game:', error);
      throw error;
    }
  };
  export const fetchPlayerGames = async (teamName: string, playerName: string, token: string): Promise<GameForPlayer[]> => {
    const url = `https://practi-web.onrender.com/api/games/team/${encodeURIComponent(teamName)}/player/${encodeURIComponent(playerName)}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error('Failed to fetch games for the player');
  
      const gamesData = await response.json();
      return gamesData;
    } catch (error) {
      console.error('Error fetching player games:', error);
      throw error;
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