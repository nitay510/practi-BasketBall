// PractiAppManager.js

import React, { useState,useEffect } from 'react';
import { HeaderCoach } from '../../cmps/headers/headerCoach';
import { HeroManager } from '../../cmps/cta/hero-manager';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';

import TeamList from '../../cmps/team/team-list'; 
import { useNavigate } from 'react-router-dom';
interface PractiViewProps {
  token: string;
  setToken: (token: string) => void;
  loginStatus: boolean;
  setLoginStatus:(isLogin: boolean) => void;
  club:string;
  master:boolean;
}

export const PractiAppManager = ({
  token,
  setToken,
  loginStatus,
  setLoginStatus,
  club,
  master
}: PractiViewProps): JSX.Element => {

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page when loginStatus is false
    if (loginStatus === false) {
      navigate('/');
    }
  }, [loginStatus]);
  

  return (
    <div className='practi-app-manager'>
        <HeroManager />
      <div className='content-container'>
        <HeaderCoach setLoginStatus={setLoginStatus}/>
        <TeamList token={token} setToken={setToken} club={club} master={master}/> {/* Use the new TeamList component */}
      </div>
      <div className="cta-bar-container">
        <CtaBarManager />
      </div>
    </div>
  );
};
