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
      className={`group flex h-full flex-col justify-between rounded-lg border border-white/10 bg-[#111318] p-6 sm:p-8 transition-colors duration-150 hover:border-white/25 ${
        featured ? 'lg:col-span-2' : 'lg:col-span-1'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#18C4A8] tabular-nums">
            {service.number} // Capability
          </span>
          <IconComponent className="h-5 w-5 text-[#A6ADBB] group-hover:text-[#18C4A8] transition-colors" aria-hidden="true" />
        </div>

        <h3 className="mt-5 text-xl sm:text-2xl font-bold text-[#F4F5F7]">
          {service.title}
        </h3>

        <p className="mt-3 text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
          {service.shortDescription}
        </p>

        <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-sm text-[#F4F5F7]">
          {service.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#18C4A8]" aria-hidden="true" />
              <span className="text-[#F4F5F7]/90">{cap}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between">
        <Link
          to={`/services#${service.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#18C4A8] transition-colors hover:text-[#F4F5F7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#18C4A8] rounded-sm"
        >
          <span>Inspect Deliverables</span>
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
};
