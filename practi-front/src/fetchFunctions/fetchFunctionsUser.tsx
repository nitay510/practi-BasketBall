export const fetchUserDetails = async (
    token: string,
    username: string,
    setFirstname: (name: string) => void,
    setLoginStatus: (status: boolean) => void,
    setClub: (club: string) => void,
    setMaster: (isMaster: boolean) => void,
    gm: string[],
    navigate: (path: string, state?: any) => void
  ) => {
    try {
      const response = await fetch(`https://practi-web.onrender.com/api/Users/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const userData = await response.json();
        const { fullName, isCoach, club } = userData;
        localStorage.setItem('firstName', fullName);
        // Set user details
        setFirstname(fullName);
        setLoginStatus(true);
        setClub(club);
        await trackLoginActivity(username);
        // Handle navigation based on user role
        if (isCoach) {
          setMaster(gm.includes(username));
          navigate('/app-manager');
        } else {
          navigate('/app', { state: { drillToDo: null } });
        }
      } else {
        alert(`Failed to fetch user details: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      alert('Failed to fetch user details');
    }
  };
  export const loginUser = async (username: string, password: string): Promise<string> => {
    const userLogin = { username, password };
  
    try {
      const res = await fetch('https://practi-web.onrender.com/api/Tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLogin),
      });
  
      if (!res.ok) {
        throw new Error('Login failed');
      }
  
      const newToken = await res.text();
      return newToken;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  export const addUser = async (
    fullName: string,
    username: string,
    password: string,
    isCoach: boolean,
    clubName: string
  ): Promise<Response> => {
    const newUser = {
      fullName,
      username,
      password,
      isCoach,
      clubName,
    };
  
    try {
      const res = await fetch('https://practi-web.onrender.com/api/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (!res.ok) {
        throw new Error(res.statusText);
      }
  
      return res;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  };

  export const trackLoginActivity = async (username: string): Promise<void> => {
    try {
      console.log("inside track login")
      const res = await fetch('https://practi-web.onrender.com/api/activity/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to track login activity');
      }
    } catch (error) {
      console.error('Error tracking login activity:', error);
    }
  };