//use the server to get the videos and return them
export  const getVideos = async (filterBy: any,token: any) => {
  const storedToken = localStorage.getItem('authToken')
    const res = await fetch(`https://practi-web.onrender.com/api/videos/${filterBy}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
    });

    if (res.ok) {
      const videos = await res.json();

    return videos;
   
}
  }
  //use the server to get the Subvideos and return them
  export  const getSubVideos = async (filterBy: any,token: any) => {
    const storedToken = localStorage.getItem('authToken')
    const res = await fetch(`https://practi-web.onrender.com/api/subVideos/${filterBy}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
    });

    if (res.ok) {
      const videos = await res.json();
  
    return videos;
   
}
  }
    //use the server to get the next category(by order) for the next drill
export const getNextCategory = async (category: any, token: any) => {
  const storedToken = localStorage.getItem('authToken')
    const res = await fetch(`https://practi-web.onrender.com/api/nextCategory/${category}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
    });
  
    if (res.ok) {
      const nextCategory = await res.json();
     
      return  nextCategory ;
    } else {
      // Handle error or throw an exception if needed
      throw new Error('Failed to fetch videos');
    }
  };
  
  //use the server to get the next video in category(by order) for the next drill
  export const getNextVideoInCategory = async (category: any, videoName: any, token: any) => {
    const storedToken = localStorage.getItem('authToken')
    // Check if videoName is null or undefined
    const actualVideoName = videoName !== null ? videoName : "null";
    const params = new URLSearchParams({
      videoName: actualVideoName,
    });
  
    const url = `https://practi-web.onrender.com/api/nextVideoCategory/${category}?${params.toString()}`;
  
    try {
      const res = await fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
      });
  
      if (res.ok) {
        // Check if the response is not empty
        const responseText = await res.text();
        const nextvideo = responseText ? JSON.parse(responseText) : null;
        return nextvideo;
      } else {
        // Handle error or throw an exception if needed
        throw new Error('Failed to fetch videos');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      // Handle fetch errors
      throw error;
    }
  };
  export const getVideoByName = async (videoName: any) => {
    const storedToken = localStorage.getItem('authToken');
    const res = await fetch(`https://practi-web.onrender.com/api/videoByName/${videoName}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
    });
  
    if (res.ok) {
      const video = await res.json();
      return video;
    } else {
      throw new Error('Failed to fetch video by name');
    }
  };
  