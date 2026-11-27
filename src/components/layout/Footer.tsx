import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { footerNavigation } from '../../data/navigation';
import { siteConfig } from '../../data/siteConfig';
import { BrandLogo } from '../ui/BrandLogo';
import { scrollToTargetSmooth } from '../../lib/scrollLogic';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { trackConversionEvent } from '../../lib/analytics';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  const handleFooterLinkClick = (targetPath: string) => {
    const [basePath, targetHash] = targetPath.split('#');
    if (location.pathname === (basePath || '/')) {
      if (targetHash) {
        scrollToTargetSmooth(targetHash, {
          offset: window.innerWidth < 1024 ? 88 : 76,
          duration: 580,
          reducedMotion,
        });
      } else {
        scrollToTargetSmooth(0, { duration: 580, reducedMotion });
      }
    }
  };

  const verifiedSocials = [
    siteConfig.socials.linkedin && { label: 'LinkedIn', href: siteConfig.socials.linkedin },
    siteConfig.socials.instagram && { label: 'Instagram', href: siteConfig.socials.instagram },
    siteConfig.socials.facebook && { label: 'Facebook', href: siteConfig.socials.facebook },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-white/10 bg-[#090A0D] text-[#A6ADBB]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to="/"
              onClick={() => handleFooterLinkClick('/')}
              aria-label="GrowthPilot Home"
              className="inline-block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#18C4A8]"
            >
              <BrandLogo variant="footer" />
            </Link>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#F4F5F7]">
              Independent Google Ads Consultancy · Abhijit Roy
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-[#A6ADBB]">
              {siteConfig.shortDescription}
            </p>
            <p className="text-xs font-mono text-[#8890A0]">
              Serving US · UK · AU · CA · IE · NZ · India
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => handleFooterLinkClick('/contact')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#18C4A8] hover:text-[#F4F5F7] transition-colors"
              >
                <span>Request a Free Account Review</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-[#F4F5F7]">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNavigation.navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    onClick={() => handleFooterLinkClick(item.path)}
                    className="hover:text-[#F4F5F7] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-[#F4F5F7]">
              Capabilities
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNavigation.services.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    onClick={() => handleFooterLinkClick(item.path)}
                    className="hover:text-[#F4F5F7] transition-colors"
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
              <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-[#F4F5F7]">
                Resources &amp; Legal
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {footerNavigation.resources.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      onClick={() => handleFooterLinkClick(item.path)}
                      className="hover:text-[#F4F5F7] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {footerNavigation.legal.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      onClick={() => handleFooterLinkClick(item.path)}
                      className="hover:text-[#F4F5F7] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4 text-xs space-y-2">
              <div className="font-mono uppercase tracking-wider text-[#F4F5F7]">
                Direct Contact
              </div>
              <p className="text-[#A6ADBB]">
                Submit your brief via the{' '}
                <Link
                  to="/contact"
                  onClick={() => handleFooterLinkClick('/contact')}
                  className="text-[#18C4A8] underline underline-offset-4 hover:text-[#F4F5F7]"
                >
                  inquiry portal
                </Link>
                . Response: {siteConfig.contact.responseWindow}.
              </p>
              {siteConfig.contact.email && (
                <div>
                  Email:{' '}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    onClick={() =>
                      trackConversionEvent('email_click', {
                        contact_method: 'email',
                        event_label: 'footer_email',
                      })
                    }
                    className="text-[#F4F5F7] underline underline-offset-4 hover:text-[#18C4A8] break-all"
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
                    onClick={() =>
                      trackConversionEvent('phone_click', {
                        contact_method: 'phone',
                        event_label: 'footer_phone',
                      })
                    }
                    className="text-[#F4F5F7] underline underline-offset-4 hover:text-[#18C4A8]"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              )}
              {siteConfig.contact.location && (
                <div>Location: {siteConfig.contact.location} (IST)</div>
              )}
              {verifiedSocials.length > 0 && (
                <div className="flex items-center gap-4 pt-1">
                  {verifiedSocials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F4F5F7] hover:text-[#18C4A8] transition-colors"
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
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#8890A0] sm:flex-row sm:items-center">
          <p>
            &copy; {currentYear} {siteConfig.brandName}. Operated independently by Abhijit Roy.{' '}
            <span className="hidden sm:inline">·</span>{' '}
            <span className="block sm:inline text-[#A6ADBB]">{siteConfig.tagline}</span>
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy-policy"
              onClick={() => handleFooterLinkClick('/privacy-policy')}
              className="hover:text-[#F4F5F7] transition-colors"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              to="/terms-and-conditions"
              onClick={() => handleFooterLinkClick('/terms-and-conditions')}
              className="hover:text-[#F4F5F7] transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              to="/faq"
              onClick={() => handleFooterLinkClick('/faq')}
              className="hover:text-[#F4F5F7] transition-colors"
            >
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
