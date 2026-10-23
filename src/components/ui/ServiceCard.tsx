import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Target,
  TrendingUp,
  BarChart3,
  Compass,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { ServiceItem } from '../../data/services';

const iconMap = {
  Globe,
  Target,
  TrendingUp,
  BarChart3,
  Compass,
};

interface ServiceCardProps {
  service: ServiceItem;
  featured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  featured = false,
}) => {
  const IconComponent = iconMap[service.iconName];

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-2xl gp-card-surface p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 ${
        featured ? 'lg:col-span-2' : 'lg:col-span-1'
      }`}
    >
      <div>
        {/* Editorial Number & Icon Header */}
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs text-[#08D9F5]">
            {service.number}. Service Capability
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#050505] text-[#08D9F5] transition-colors group-hover:border-[#08D9F5]/40">
            <IconComponent className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        <h3 className="mt-5 text-xl sm:text-2xl font-bold tracking-tight text-white">
          {service.title}
        </h3>

        <p className="mt-3 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
          {service.shortDescription}
        </p>

        {/* Capabilities List */}
        <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-sm text-white/90">
          {service.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2.5">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-[#00E6A8]"
                aria-hidden="true"
              />
              <span>{cap}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#08D9F5] transition-colors hover:text-[#00E6A8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08D9F5] rounded-sm"
        >
          <span>Explore Service</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};
