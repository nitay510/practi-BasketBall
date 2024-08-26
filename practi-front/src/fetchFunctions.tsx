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
  