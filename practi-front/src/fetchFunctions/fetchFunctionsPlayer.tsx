import { DrillModel } from '../Models/DrillModel'
import { GameForPlayer } from '../views/InGameStats/gameForPlayer';

export interface Drill {
    drillId: string;
    date: string;
    userPlayer: string;
    userCoach: string;
    drillName: string;
    topic: string;
  }
/**
 * Fetches drills from the server based on the selected category.
 * @param category - The category to filter drills.
 * @param token - The authentication token.
 * @returns A list of drills related to the specified category.
 */
export const fetchDrills = async (category: string, token: string): Promise<DrillModel[]> => {
    const url = `https://practi-web.onrender.com/api/Drills/${category}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const res = await fetch(url, { method: 'GET', headers });
  
      if (!res.ok) {
        throw new Error('Unable to fetch drills');
      }
  
      const drillsData = await res.json();
      return drillsData;
    } catch (error) {
      console.error('Error fetching drills:', error);
      throw error; // Rethrow the error to handle it in the calling component
    }
  };

  /**
 * Fetches all double drills from the server.
 * @param token - The authentication token.
 * @returns A list of double drills.
 */
export const fetchAllDoubleDrills = async (token: string): Promise<DrillModel[]> => {
    const url = `https://practi-web.onrender.com/api/DrillsDouble`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const res = await fetch(url, { method: 'GET', headers });
  
      if (!res.ok) {
        throw new Error('Unable to fetch drills');
      }
  
      const drillsData = await res.json();
      return drillsData;
    } catch (error) {
      console.error('Error fetching drills:', error);
      throw error;
    }
  };

  /**
 * Fetches the high score for a specific drill.
 * @param title - The title of the drill.
 * @param drillName - The name of the drill.
 * @param token - The authentication token.
 * @returns The high score for the drill.
 */
export const fetchHighScore = async (title: string, drillName: string, token: string): Promise<number> => {
  const params = new URLSearchParams({ drillName });
  const url = `https://practi-web.onrender.com/api/Drills/highScore/${title}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Unable to fetch high score');
    }

    const highScore = await response.json();
    return highScore;
  } catch (error) {
    console.error('Error fetching high score:', error);
    throw error;
  }
};

/**
 * Submits the drill result to the server.
 * @param drillId - The ID of the drill.
 * @param data - The data to submit.
 * @param token - The authentication token.
 */
export const submitDrillResult = async (drillId: string, data: any, token: string): Promise<void> => {
  const url = `https://practi-web.onrender.com/api/Drills/${drillId}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit drill result');
    }
  } catch (error) {
    console.error('Error submitting drill result:', error);
    throw error;
  }
};
// fetchFunctionsPlayer.ts

/**
 * Submits the result of a double drill to the server.
 * @param drillId - The ID of the drill.
 * @param data - The data to submit.
 * @param token - The authentication token.
 */
export const submitDoubleDrillResult = async (drillId: string, data: any, token: string): Promise<void> => {
  const url = `https://practi-web.onrender.com/api/Drills/${drillId}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit double drill result');
    }
  } catch (error) {
    console.error('Error submitting double drill result:', error);
    throw error;
  }
};

  
  /**
   * Fetches the number of wins for a specific opponent.
   * @param token - The authentication token.
   * @param opponent - The opponent's name.
   * @returns The number of wins against the specified opponent.
   */
  export const fetchWins = async (token: string, opponent: string | undefined): Promise<number> => {
    const url = `https://practi-web.onrender.com/api/Drills/howManyWins/${opponent}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const res = await fetch(url, { method: 'GET', headers });
  
      if (!res.ok) {
        throw new Error('Unable to fetch wins');
      }
  
      const wins = await res.json();
      return wins;
    } catch (error) {
      console.error('Error fetching wins:', error);
      throw error;
    }
  };
  
  /**
   * Fetches the number of losses for a specific opponent.
   * @param token - The authentication token.
   * @param opponent - The opponent's name.
   * @param drills - The list of drills to calculate losses from.
   * @returns The number of losses against the specified opponent.
   */
  export const fetchLosses = async (
    token: string,
    opponent: string | undefined,
    drills: DrillModel[]
  ): Promise<number> => {
    const total = drills.filter((drill) => drill.opponentName === opponent).length;
    const wins = await fetchWins(token, opponent);
    return total - wins;
  };

  /**
 * Fetches all drills assigned to the current user.
 * @param token - The authentication token.
 * @returns A list of drills assigned to the user.
 */
export const fetchUserDrills = async (token: string): Promise<Drill[]> => {
    const url = 'https://practi-web.onrender.com/api/SendDrills/user';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const response = await fetch(url, { method: 'GET', headers });
      if (!response.ok) {
        throw new Error('Failed to fetch drills');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching drills:', error);
      throw error;
    }
  };
  
  /**
   * Checks which drills the user has completed.
   * @param drills - The list of drills to check.
   * @param token - The authentication token.
   * @returns A list of completed drill names.
   */
  export const fetchCompletedDrills = async (drills: Drill[], token: string): Promise<string[]> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const responses = await Promise.all(
        drills.map((drill) =>
          fetch(`https://practi-web.onrender.com/api/checkUserDrill?drillName=${drill.drillName}`, {
            method: 'GET',
            headers,
          })
        )
      );
  
      const results = await Promise.all(responses.map((res) => res.json()));
      return drills
        .filter((_, index) => results[index].hasDoneDrill)
        .map((drill) => drill.drillName);
    } catch (error) {
      console.error('Error checking completed drills:', error);
      throw error;
    }
  };


export const fetchLastDrill = async (token: string) => {
    try {
      const storedToken = localStorage.getItem('authToken') || token;
      const response = await fetch(`https://practi-web.onrender.com/api/LastDrill/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
      });
  
      if (response.ok) {
        const lastDrillData = await response.json();
        return lastDrillData;
      } else {
        throw new Error('Failed to fetch the last drill');
      }
    } catch (error) {
      console.error('Error fetching last drill:', error);
      throw error;
    }
  };

/**
 * Joins a team.
 * @param teamName - The name of the team to join.
 * @param club - The club name.
 * @param token - The authentication token.
 */
export const joinTeam = async (teamName: string, club: string, token: string): Promise<void> => {
  const url = 'https://practi-web.onrender.com/api/teams/join';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ teamName, club }),
    });

    if (!response.ok) {
      throw new Error('Failed to join the team');
    }
  } catch (error) {
    console.error('Error joining team:', error);
    throw error;
  }
};

/**
 * Leaves a team.
 * @param teamName - The name of the team to leave.
 * @param token - The authentication token.
 */
export const leaveTeam = async (teamName: string, token: string): Promise<void> => {
  const url = 'https://practi-web.onrender.com/api/teams/removePlayerByPlayer';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ teamName }),
    });

    if (!response.ok) {
      throw new Error('Failed to leave the team');
    }
  } catch (error) {
    console.error('Error leaving team:', error);
    throw error;
  }
};
/**
 * Fetches the current teams a player is part of.
 * @param token - The authentication token.
 * @returns A list of teams the player is part of.
 */
export const fetchPlayerTeams = async (token: string): Promise<any[]> => {
  const url = 'https://practi-web.onrender.com/api/teams/player';

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch player teams');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching player teams:', error);
    throw error;
  }
};
/**
 * Fetches the wins and losses for a specific team.
 * @param teamName - The name of the team.
 * @param token - The authentication token.
 * @returns An object containing the wins and losses.
 */
export const fetchWinsLosses = async (teamName: string, token: string): Promise<{ wins: number, losses: number }> => {
  const url = `https://practi-web.onrender.com/api/games/team/${teamName}/wins-losses`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch wins and losses');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching wins and losses:', error);
    throw error;
  }
};

export const fetchGamesForPlayer = async (teamName: string, playerName: string, token: string): Promise<GameForPlayer[]> => {
  const response = await fetch(`https://practi-web.onrender.com/api/games/team/${encodeURIComponent(teamName)}/player/${encodeURIComponent(playerName)}`, {
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  });

  if (!response.ok) {
      throw new Error('Failed to fetch games');
  }

  const data: GameForPlayer[] = await response.json();
  return data;
};