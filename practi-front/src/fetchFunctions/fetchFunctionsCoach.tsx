import { DrillModel } from "../Models/DrillModel";
import { Player } from "../views/InGameStats/Player";
import { GameForPlayer } from "../views/InGameStats/gameForPlayer";

/**
 * Fetches all teams associated with a given club.
 * If the user is a master, it fetches teams based on the club name; otherwise, it fetches all teams.
 * @param club - The name of the club.
 * @param token - The authentication token.
 * @param master - Boolean indicating if the user is a master or not.
 * @returns A list of teams associated with the club.
 */
export const fetchTeams = async (club: string, token: string, master: boolean): Promise<any[]> => {
  console.log(club);
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

/**
 * Deletes a team by its name.
 * @param teamName - The name of the team to delete.
 * @param token - The authentication token.
 * @returns A promise indicating the success of the operation.
 */
export const deleteTeam = async (teamName: string, token: string): Promise<void> => {
  const url = 'https://practi-web.onrender.com/api/teams/delete';

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teamName }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete the team');
    }

    console.log(`Team ${teamName} deleted successfully`);
  } catch (error) {
    console.error('Error deleting the team:', error);
    throw error;
  }
};

/**
 * Fetches teams along with their associated players.
 * If the user is a master, it fetches teams based on the club name; otherwise, it fetches all teams.
 * @param token - The authentication token.
 * @param club - The name of the club.
 * @param master - Boolean indicating if the user is a master or not.
 * @returns A list of teams with associated players.
 */
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

/**
 * Fetches the list of players for a specific team.
 * @param teamName - The name of the team.
 * @param token - The authentication token.
 * @returns A list of players for the specified team.
 */
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

/**
 * Fetches a list of players for a specific team.
 * @param teamName - The name of the team.
 * @param token - The authentication token.
 * @returns A list of players for the team.
 */
export const fetchPlayersForTeamList = async (teamName: string, token: string): Promise<any[]> => {
  const response = await fetch('https://practi-web.onrender.com/api/teams/players', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ teamName }),
  });

  if (!response.ok) throw new Error('Failed to fetch players');
  const data = await response.json();
  return data.players || [];
};

/**
 * Adds a new team to the system.
 * @param teamName - The name of the team.
 * @param club - The club name the team belongs to.
 * @param token - The authentication token.
 * @returns A response object containing the result of the operation.
 */
export const addTeam = async (teamName: string, club: string, token: string): Promise<Response> => {
  const response = await fetch('https://practi-web.onrender.com/api/teams/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ teamName, club }),
  });

  return response;
};

/**
 * Deletes a player from a specific team.
 * @param username - The username of the player to delete.
 * @param teamName - The name of the team the player belongs to.
 * @param token - The authentication token.
 * @returns A response object indicating the result of the deletion.
 */
export const deletePlayerFromTeam = async (username: string, teamName: string, token: string): Promise<Response> => {
  const response = await fetch('https://practi-web.onrender.com/api/teams/removePlayerByCoach', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, teamName }),
  });

  return response;
};

/**
 * Sends drill assignments to the specified players.
 * @param token - The authentication token.
 * @param assignments - An array of assignments containing drill and player details.
 * @returns A promise indicating the success or failure of the operation.
 */
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

/**
 * Fetches all games associated with a club or coach.
 * If the user is a master, it fetches games based on the club name; otherwise, it fetches all games for the coach.
 * @param token - The authentication token.
 * @param master - Boolean indicating if the user is a master or not.
 * @param club - The name of the club.
 * @returns A list of games.
 */
export const fetchGames = async (token: string, master: boolean, club: string): Promise<any[]> => {
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

/**
 * Saves game details to the system.
 * @param gameDetails - The details of the game to save.
 * @param token - The authentication token.
 * @returns A promise indicating the success of the save operation.
 */
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

/**
 * Deletes a previous game based on the date, team, and rival team names.
 * @param gameDate - The date of the game.
 * @param teamName - The name of the team.
 * @param rivalTeamName - The name of the rival team.
 * @param token - The authentication token.
 * @returns A promise indicating the success of the delete operation.
 */
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


/// Fetches games for a specific player within a team.
/**
 * Fetches games for a specific player in a team.
 * @param teamName - The name of the team.
 * @param playerName - The name of the player.
 * @param token - The authentication token.
 * @returns A list of games associated with the player.
 */
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

// Deletes a game based on specific details such as date, team name, and rival team name.
/**
 * Deletes a game based on the specified date, team, and rival team names.
 * @param gameDate - The date of the game.
 * @param teamName - The name of the team.
 * @param rivalTeamName - The name of the rival team.
 * @param token - The authentication token.
 * @returns A promise indicating the success of the deletion operation.
 */
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

// Fetches event details by its ID.
/**
 * Fetches the details of an event by its ID.
 * @param eventId - The ID of the event to fetch.
 * @param token - The authentication token.
 * @returns The details of the event.
 */
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

// Updates an event by its ID with new data.
/**
 * Updates an event by its ID with the provided new data.
 * @param eventId - The ID of the event to update.
 * @param token - The authentication token.
 * @param updatedEvent - The new event data to update.
 * @returns A promise indicating the success of the update.
 */
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

// Deletes an event by its ID.
/**
 * Deletes an event by its ID.
 * @param eventId - The ID of the event to delete.
 * @param token - The authentication token.
 * @returns A promise indicating the success of the deletion operation.
 */
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

// Creates a new event.
/**
 * Creates a new event in the system.
 * @param token - The authentication token.
 * @param newEvent - The details of the new event to create.
 * @returns A promise indicating the success of the event creation.
 */
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

// Creates a new game event.
/**
 * Creates a new game event in the system.
 * @param token - The authentication token.
 * @param newEvent - The details of the new game event to create.
 * @returns A promise indicating the success of the game event creation.
 */
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

// Fetches all events for the authenticated user.
/**
 * Fetches all events associated with the authenticated user.
 * @param token - The authentication token.
 * @returns A list of events associated with the user.
 */
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

// Fetches the details of a specific game based on the event date, team name, and rival team name.
/**
 * Fetches the details of a specific game based on the event date, team name, and rival team name.
 * @param token - The authentication token.
 * @param eventDate - The date of the game.
 * @param teamName - The name of the team.
 * @param rivalTeamName - The name of the rival team.
 * @returns The details of the game, or null if no game is found.
 */
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

// Fetches drills by a coach for a specific player and category.
/**
 * Fetches drills by a coach for a specific player and category.
 * @param category - The drill category.
 * @param token - The authentication token.
 * @param player - The player for whom drills are being fetched.
 * @returns A list of drills assigned by the coach.
 */
export const fetchDrillsByCoach = async (category: string, token: string, player: string): Promise<DrillModel[]> => {
  const url = `https://practi-web.onrender.com/api/DrillsByCoach/${category}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ currentUser: player }), // Body contains the player’s ID
    });

    if (!res.ok) {
      throw new Error('Unable to fetch drills');
    }

    const drillsData = await res.json();
    return drillsData;
  } catch (error) {
    console.error('Error fetching drills by coach:', error);
    throw error;
  }
};
