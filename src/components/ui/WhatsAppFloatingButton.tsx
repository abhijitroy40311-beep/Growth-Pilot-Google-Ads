import React from 'react';
import { siteConfig } from '../../data/siteConfig';
import { buildWhatsAppContactUrl } from '../../lib/validation';

export const WhatsAppFloatingButton: React.FC = () => {
  const whatsappHref = buildWhatsAppContactUrl(
    siteConfig.contact.whatsapp,
    siteConfig.contact.whatsappMessage
  );

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Quick contact on WhatsApp"
      title="Quick contact on WhatsApp"
      className="group fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-[#050505] shadow-[0_8px_28px_rgba(37,211,102,0.4)] ring-2 ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-[#1ebe5d] hover:shadow-[0_12px_34px_rgba(37,211,102,0.58)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      {/* Tooltip label on hover/focus */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-white/15 bg-[#0B0D10]/95 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block translate-x-1"
      >
        Quick Contact on WhatsApp
      </span>

      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="currentColor"
        aria-hidden="true"
        className="h-[26px] w-[26px] transition-transform duration-200 group-hover:scale-105"
      >
        <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.968 0 1.758.459 3.474 1.331 4.988L2 22l5.188-1.361a9.927 9.927 0 0 0 4.841 1.258h.004c5.515 0 9.967-4.453 9.967-9.968A9.936 9.936 0 0 0 19.08 4.92 9.934 9.934 0 0 0 12.031 2Zm0 18.215h-.003a8.26 8.26 0 0 1-4.212-1.153l-.302-.179-3.136.823.837-3.057-.197-.313a8.242 8.242 0 0 1-1.273-4.399c0-4.55 3.702-8.252 8.255-8.252 2.204 0 4.277.859 5.835 2.418a8.202 8.202 0 0 1 2.416 5.836c0 4.551-3.702 8.276-8.22 8.276Zm4.528-6.178c-.248-.124-1.468-.725-1.695-.807-.227-.083-.393-.124-.558.124-.165.248-.64.807-.785.972-.145.165-.289.186-.537.062-.248-.124-1.047-.386-1.994-1.23-.737-.658-1.235-1.471-1.38-1.719-.145-.248-.015-.382.109-.506.111-.111.248-.289.372-.434.124-.145.165-.248.248-.413.083-.165.041-.31-.021-.434-.062-.124-.558-1.344-.765-1.84-.201-.483-.405-.418-.558-.426l-.475-.008c-.165 0-.434.062-.661.31-.227.248-.868.848-.868 2.067 0 1.219.889 2.398 1.013 2.563.124.165 1.749 2.671 4.238 3.745.592.256 1.054.409 1.414.523.594.189 1.135.162 1.563.098.477-.071 1.468-.6 1.674-1.178.207-.579.207-1.075.145-1.178-.062-.103-.227-.165-.475-.289Z" />
      </svg>
    </a>
  );
};
