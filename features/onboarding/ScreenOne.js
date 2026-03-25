import React from 'react';
import OnboardingSlide from './OnboardingSlide';
import { APP_ASSETS } from '../../core/assets';

export default function ScreenOne() {
  return (
    <OnboardingSlide
      badgeText="WELCOME"
      title="Welcome to AbleAssist!"
      source={APP_ASSETS.onboarding.welcome}
      description="The AI-powered accessibility companion empowering inclusive communication for everyone."
    />
  );
}
