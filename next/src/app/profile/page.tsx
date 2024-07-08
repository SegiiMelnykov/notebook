'use client';
import { useAppSelector } from '@/hooks/use-redux';
import ProfileView from '@/sections/profile/view/profile-view';
import { useGetProfileQuery } from '@/store/profile/api';
import { Typography } from '@mui/material';

import { Metadata } from 'next/types';

export default function Home() {
  const { user } = useAppSelector((state) => state.auth);
  const { data: profile, isSuccess } = useGetProfileQuery(user?.id, {
    skip: !user || !user.id,
  });
  console.log('user', user);
  console.log('profile', profile);
  return (
    <main>
      <Typography
        variant='h3'
        sx={{ textAlign: 'center', textTransform: 'capitalize' }}
      >
        Profile
      </Typography>
      {isSuccess && profile && <ProfileView profile={profile} />}
    </main>
  );
}
