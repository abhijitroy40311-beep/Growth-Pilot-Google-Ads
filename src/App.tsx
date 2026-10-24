/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgressIndicator } from './components/animation/ScrollProgressIndicator';
import { BackToTopButton } from './components/animation/BackToTopButton';
import { WhatsAppFloatingButton } from './components/ui/WhatsAppFloatingButton';
import { PageTransition } from './components/animation/PageTransition';

import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const FAQ = lazy(() => import('./pages/FAQ'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-[#050505] text-white">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#08D9F5] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#050505] focus:shadow-lg"
          >
            Skip to main content
          </a>
          <ScrollProgressIndicator />
          <Navbar />
          <main id="main-content" className="flex-1 overflow-x-clip">
            <PageTransition>
              <Suspense
                fallback={
                  <div
                    aria-busy="true"
                    aria-label="Loading page content"
                    className="min-h-[75vh] w-full bg-[#050505]"
                  />
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/work" element={<Navigate to="/projects" replace />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/thank-you" element={<ThankYou />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </Suspense>
            </PageTransition>
          </main>
          <Footer />
          <BackToTopButton />
          <WhatsAppFloatingButton />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
