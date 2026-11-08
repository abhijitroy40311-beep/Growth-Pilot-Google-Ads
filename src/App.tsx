/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgressIndicator } from './components/animation/ScrollProgressIndicator';
import { BackToTopButton } from './components/animation/BackToTopButton';
import { WhatsAppFloatingButton } from './components/ui/WhatsAppFloatingButton';
import { PageTransition } from './components/animation/PageTransition';

import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import DentalImplantMarketing from './pages/DentalImplantMarketing';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ThankYou from './pages/ThankYou';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import NotFound from './pages/NotFound';

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
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/work" element={<Navigate to="/projects" replace />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/services" element={<Services />} />
                <Route
                  path="/dental-implant-marketing"
                  element={<DentalImplantMarketing />}
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
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
