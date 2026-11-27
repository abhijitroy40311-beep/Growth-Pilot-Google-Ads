import React from 'react';
import { Link } from 'react-router-dom';
import { Magnet } from '../animation/Magnet';
import { SplitText } from '../animation/SplitText';

interface EditorialEyebrowProps {
  index?: string;
  label: string;
  tone?: 'teal' | 'muted';
  className?: string;
}

export const EditorialEyebrow: React.FC<EditorialEyebrowProps> = ({
  index,
  label,
  tone = 'teal',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] ${
        tone === 'teal' ? 'text-[#18C4A8]' : 'text-[#8890A0]'
      } ${className}`}
    >
      {index && <span className="tabular-nums">{index}</span>}
      {index && <span aria-hidden="true" className="text-white/25">//</span>}
      <span>{label}</span>
    </div>
  );
};

interface EditorialSectionHeaderProps {
  headingId?: string;
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  action?: React.ReactNode;
}

export const EditorialSectionHeader: React.FC<EditorialSectionHeaderProps> = ({
  headingId,
  index,
  eyebrow,
  title,
  lead,
  action,
}) => {
  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
      <div className="max-w-2xl">
        <EditorialEyebrow index={index} label={eyebrow} />
        <SplitText
          id={headingId}
          as="h2"
          text={title}
          className="mt-3 text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-[-0.025em] text-[#F4F5F7] leading-[1.12]"
        />
        {lead && (
          <p className="mt-4 max-w-[60ch] text-base sm:text-lg text-[#A6ADBB] leading-relaxed">
            {lead}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

interface ActionButtonLinkProps {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  magnetic?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ActionLinkButton: React.FC<ActionButtonLinkProps> = ({
  to,
  children,
  variant = 'primary',
  magnetic = false,
  onClick,
  className = '',
}) => {
  const baseClass =
    'inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-md px-6 py-3 text-sm sm:text-base font-semibold transition-[background-color,border-color,color] duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8]';
  const variantClass =
    variant === 'primary'
      ? 'bg-[#F4F5F7] text-[#090A0D] hover:bg-[#18C4A8] hover:text-[#090A0D]'
      : 'border border-white/20 bg-transparent text-[#F4F5F7] hover:border-white/45 hover:bg-white/[0.04]';

  const linkEl = (
    <Link to={to} onClick={onClick} className={`${baseClass} ${variantClass} ${className}`}>
      {children}
    </Link>
  );

  if (magnetic && variant === 'primary') {
    return <Magnet>{linkEl}</Magnet>;
  }

  return linkEl;
};
