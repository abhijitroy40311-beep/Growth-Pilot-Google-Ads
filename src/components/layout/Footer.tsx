import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { footerNavigation } from '../../data/navigation';
import { siteConfig } from '../../data/siteConfig';
import { BrandLogo } from '../ui/BrandLogo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const verifiedSocials = [
    siteConfig.socials.linkedin && { label: 'LinkedIn', href: siteConfig.socials.linkedin },
    siteConfig.socials.instagram && { label: 'Instagram', href: siteConfig.socials.instagram },
    siteConfig.socials.facebook && { label: 'Facebook', href: siteConfig.socials.facebook },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-white/10 bg-[#050505] text-[#A5AAB4]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" aria-label="GrowthPilot Home" className="inline-block">
              <BrandLogo variant="footer" />
            </Link>
            <p className="text-sm font-semibold text-white tracking-wide">
              {siteConfig.tagline}
            </p>
            <p className="text-sm leading-relaxed text-[#A5AAB4] max-w-sm">
              {siteConfig.shortDescription}
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#08D9F5] hover:text-[#00E6A8] transition-colors"
              >
                <span>Start a Project Conversation</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-wider text-white">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNavigation.navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-wider text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNavigation.services.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources, Legal & Verified Contact Column */}
          <div className="sm:col-span-12 md:col-span-6 lg:col-span-3 space-y-6">
            <div>
              <h3 className="text-xs font-semibold tracking-wider text-white">
                Resources &amp; Legal
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {footerNavigation.resources.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {footerNavigation.legal.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Contact & Socials */}
            <div className="border-t border-white/10 pt-4 text-xs space-y-2">
              <div className="text-white font-medium">Direct Inquiry Channel</div>
              <p className="text-[#A5AAB4]">
                Submit project requirements via our{' '}
                <Link to="/contact#inquiry-form" className="text-[#08D9F5] underline underline-offset-4 hover:text-white">
                  online inquiry portal
                </Link>
                . Typical response window: {siteConfig.contact.responseWindow}.
              </p>
              {siteConfig.contact.email && (
                <div>
                  Email:{' '}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-white underline underline-offset-4 hover:text-[#08D9F5]"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              )}
              {siteConfig.contact.phone && (
                <div>
                  Phone:{' '}
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-white underline underline-offset-4 hover:text-[#08D9F5]"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              )}
              {siteConfig.contact.location && (
                <div>Location: {siteConfig.contact.location}</div>
              )}
              {verifiedSocials.length > 0 && (
                <div className="flex items-center gap-3 pt-1">
                  {verifiedSocials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#08D9F5] transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#A5AAB4] sm:flex-row sm:items-center">
          <p>
            &copy; {currentYear} {siteConfig.brandName}. All rights reserved.{' '}
            <span className="hidden sm:inline">·</span>{' '}
            <span className="block sm:inline text-white/70">{siteConfig.tagline}</span>
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/faq" className="hover:text-white transition-colors">
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
