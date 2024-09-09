/**
 * Fetches user details and sets various user-related states.
 * @param token - The authentication token.
 * @param username - The username of the user whose details are being fetched.
 * @param setFirstname - Function to set the user's first name.
 * @param setLoginStatus - Function to set the login status.
 * @param setClub - Function to set the club name for the user.
 * @param setMaster - Function to set whether the user is a master coach.
 * @param gm - Array of master coach usernames.
 * @param navigate - Function to navigate to a specific route.
 */
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
      console.log("fetchUserDetails");
      const userData = await response.json();
      const { fullName, isCoach, club } = userData;
      localStorage.setItem('firstName', fullName);
      // Set user details
      setFirstname(fullName);
      setLoginStatus(true);
      setClub(club);
      trackLoginActivity(username);
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

/**
 * Logs in a user and returns an authentication token.
 * @param username - The username of the user.
 * @param password - The password of the user.
 * @returns A promise resolving to the new authentication token.
 */
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

/**
 * Adds a new user to the system.
 * @param fullName - The full name of the new user.
 * @param username - The username of the new user.
 * @param password - The password of the new user.
 * @param isCoach - Boolean indicating whether the user is a coach.
 * @param clubName - The name of the club the user belongs to.
 * @returns A promise resolving to the response from the server.
 */
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

/**
 * Tracks the login activity of a user.
 * @param username - The username of the user whose login activity is being tracked.
 * @returns A promise indicating the success or failure of the tracking operation.
 */
export const trackLoginActivity = async (username: string): Promise<void> => {
  try {
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
