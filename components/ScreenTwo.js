import React from 'react';
import OnboardingSlide from './OnboardingSlide';
import { APP_ASSETS } from '../config/assets';

export default function ScreenTwo() {
  return (
    <OnboardingSlide
      badgeText="ASL RECOGNITION"
      title="Bridging the Gap with AI"
      source={APP_ASSETS.onboarding.asl}
      description="Translate ASL gestures into English text and speech in real-time, making conversations effortless."
    />
  );
}
