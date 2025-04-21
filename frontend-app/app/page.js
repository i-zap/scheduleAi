// app/page.js
'use client';

import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';


export default function Home() {
  useEffect(() => {
    document.title = "Post Scheduler | Home";
  }, []);

  return (
    <>
      <HeroSection />
      <Features />
    </>
  );
}
