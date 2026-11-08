import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { AnimatedHeading } from '../animation/AnimatedHeading';
import { ScrollReveal } from '../animation/ScrollReveal';

interface DialogueMessage {
  id: string;
  speaker: 'BUSINESS OWNER' | 'GROWTHPILOT';
  showTypingLeadIn?: boolean;
  text: React.ReactNode;
}

const storyMessages: DialogueMessage[] = [
  {
    id: 'msg-1',
    speaker: 'BUSINESS OWNER',
    text: (
      <>
        &ldquo;I&apos;m getting website visitors, but{' '}
        <span className="text-white font-semibold">very few enquiries</span>.&rdquo;
      </>
    ),
  },
  {
    id: 'msg-2',
    speaker: 'GROWTHPILOT',
    showTypingLeadIn: true,
    text: (
      <>
        &ldquo;Let&apos;s identify{' '}
        <span className="gp-gradient-text font-semibold">
          what&apos;s preventing those visitors from taking action
        </span>
        .&rdquo;
      </>
    ),
  },
  {
    id: 'msg-3',
    speaker: 'BUSINESS OWNER',
    text: (
      <>
        &ldquo;How do we know{' '}
        <span className="text-white font-semibold">what is actually working</span>?&rdquo;
      </>
    ),
  },
  {
    id: 'msg-4',
    speaker: 'GROWTHPILOT',
    showTypingLeadIn: true,
    text: (
      <>
        &ldquo;We can improve your{' '}
        <span className="gp-gradient-text font-semibold">landing page</span>,{' '}
        <span className="gp-gradient-text font-semibold">
          measure calls and form submissions
        </span>
        , and use <span className="gp-gradient-text font-semibold">campaign data</span> to guide the next steps.&rdquo;
      </>
    ),
  },
  {
    id: 'msg-5',
    speaker: 'BUSINESS OWNER',
    text: (
      <>
        &ldquo;So the focus isn&apos;t just more traffic?&rdquo;
      </>
    ),
  },
  {
    id: 'msg-6',
    speaker: 'GROWTHPILOT',
    showTypingLeadIn: true,
    text: (
      <>
        &ldquo;Exactly. The goal is to build a{' '}
        <span className="gp-gradient-text font-semibold">
          better path from discovery to a meaningful enquiry
        </span>
        .&rdquo;
      </>
    ),
  },
];

export const ChatStory: React.FC = () => {
  return (
    <section
      id="stage-story"
      aria-labelledby="chat-story-heading"
      className="relative border-t border-white/10 bg-[#0B0D10] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-mono text-[#08D9F5]">
            01 · From Problem to Growth · Sample Consultation Dialogue
          </div>
          <AnimatedHeading
            id="chat-story-heading"
            as="h2"
            text="Every Business Has a Growth Story."
            highlightWords={['Growth', 'Story']}
            className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white"
          />
          <p className="mt-3 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
            An illustrative look at how we diagnose conversion bottlenecks and connect website improvements with measurable enquiry tracking.
          </p>
        </div>

        {/* Conversation Frame */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-[#050505] p-5 sm:p-8 md:p-10 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs text-[#A5AAB4]">
            <div className="flex items-center gap-2 font-mono">
              <MessageSquare className="h-4 w-4 text-[#08D9F5]" aria-hidden="true" />
              <span>Discovery Dialogue — Sample Scenario</span>
            </div>
            <span className="font-mono text-[#A5AAB4]">Illustrative Example</span>
          </div>

          <div className="mt-8 space-y-6">
            {storyMessages.map((msg, index) => {
              const isGrowthPilot = msg.speaker === 'GROWTHPILOT';

              return (
                <ScrollReveal
                  key={msg.id}
                  delay={index * 0.06}
                  yOffset={18}
                  className={`flex flex-col ${
                    isGrowthPilot ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="mb-1.5 flex items-center gap-2 text-xs font-mono text-[#A5AAB4]">
                    {isGrowthPilot && (
                      <span className="relative inline-flex aspect-square h-3.5 w-3.5 shrink-0 items-center justify-center overflow-hidden">
                        <img
                          src={siteConfig.assets.emblemSvg}
                          alt=""
                          aria-hidden="true"
                          width={14}
                          height={14}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-contain"
                        />
                      </span>
                    )}
                    <span>
                      {isGrowthPilot ? 'GrowthPilot Consultant' : 'Business Owner'}
                    </span>
                    {msg.showTypingLeadIn && (
                      <span
                        aria-hidden="true"
                        className="inline-flex items-center gap-1 rounded bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-[#08D9F5]"
                      >
                        <span className="inline-block h-1 w-1 rounded-full bg-[#1677FF]" />
                        <span className="inline-block h-1 w-1 rounded-full bg-[#08D9F5]" />
                        <span className="inline-block h-1 w-1 rounded-full bg-[#00E6A8]" />
                      </span>
                    )}
                  </div>

                  <div
                    className={`max-w-xl rounded-2xl px-5 py-4 text-sm sm:text-base leading-relaxed ${
                      isGrowthPilot
                        ? 'border border-[#08D9F5]/30 bg-[#0B0D10] text-white shadow-lg'
                        : 'border border-white/10 bg-white/[0.03] text-[#A5AAB4]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Closing Prompt & CTA */}
          <ScrollReveal className="mt-10 border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-lg sm:text-xl font-bold text-white">
                Your next growth chapter starts here.
              </p>
              <p className="mt-1 text-xs sm:text-sm text-[#A5AAB4]">
                Tell us where visitors are dropping off and what kind of enquiries matter most to your business.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl gp-gradient-bg px-5 py-3 text-sm font-semibold text-[#050505] transition-transform duration-150 hover:scale-[1.02] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08D9F5]"
            >
              <span>Discuss Your Goals</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
