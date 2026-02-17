import React from 'react';
import OnboardingSlide from './OnboardingSlide';
import { APP_ASSETS } from '../config/assets';

export default function ScreenThree() {
  return (
    <OnboardingSlide
      badgeText="TEXT TO SPEECH"
      title="Effortless Voice Synthesis"
      source={APP_ASSETS.onboarding.tts}
      description="Convert any text or document into natural, expressive speech with instant audio playback."
    />
  );
}
