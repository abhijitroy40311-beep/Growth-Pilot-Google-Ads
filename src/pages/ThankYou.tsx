import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
    CheckCircle2,
    AlertCircle,
    Mail,
    MessageCircle,
    RotateCcw,
    ArrowRight,
    Clock,
    ShieldCheck,
    Sparkles,
    Copy,
    Check,
    Home,
} from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
    THANK_YOU_RECEIPT_STORAGE_KEY,
    resolveThankYouReceipt,
    buildWhatsAppContactUrl,
    buildWhatsAppInquiryMessage,
    ContactFormPayload,
} from '../lib/validation';
import { siteConfig } from '../data/siteConfig';

const nextSteps = [
    {
        step: '01',
        title: 'Initial Brief & Website Review',
        description:
            'Our senior team reviews your business goals, current digital presence, and service requirements to understand your highest-leverage opportunities.',
    },
    {
        step: '02',
        title: 'Tailored Strategy & Scope Outline',
        description:
            'We prepare clear, practical recommendations covering architecture, timeline, and transparent milestones — with zero generic sales fluff.',
    },
    {
        step: '03',
        title: 'Direct Response Within 1–2 Business Days',
        description:
            'We reach out directly to your email (or WhatsApp if preferred) to share our initial thoughts and schedule a focused discovery conversation.',
    },
];

export default function ThankYou() {
    const location = useLocation();
    const navigate = useNavigate();
    const [copiedId, setCopiedId] = useState(false);

    useDocumentMeta({
        title: 'Thank You — GrowthPilot | Project Inquiry Received',
        description:
            'Thank you for submitting your project inquiry to GrowthPilot. Our team has received your brief and will respond within 1–2 business days.',
        path: '/thank-you',
    });

    const locationReceipt = (
        location.state as { receipt?: unknown } | null | undefined
    )?.receipt;

    const storedReceiptRaw =
        typeof window !== 'undefined'
            ? window.sessionStorage.getItem(THANK_YOU_RECEIPT_STORAGE_KEY)
            : null;

    const receipt = resolveThankYouReceipt(locationReceipt, storedReceiptRaw);

    // Strict guard: Only show the Thank-You page after completing the Contact Page form submission
    if (!receipt) {
        return <Navigate to="/contact" replace />;
    }

    const fallbackFormData: ContactFormPayload = receipt.formData ?? {
        name: receipt.summary.name,
        businessName: receipt.summary.businessName,
        email: receipt.summary.email,
        phone: '',
        websiteUrl: '',
        serviceOfInterest: receipt.summary.serviceOfInterest,
        projectBudget: '',
        projectGoals: 'Submitted via GrowthPilot Contact Form.',
        consent: true,
        honeypot: '',
    };

    const whatsappFollowupHref = buildWhatsAppContactUrl(
        siteConfig.contact.whatsapp,
        buildWhatsAppInquiryMessage(fallbackFormData, receipt.inquiryId)
    );

    const fallbackMailtoHref = siteConfig.contact.email
        ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
            `GrowthPilot Inquiry [${receipt.inquiryId}] - ${receipt.summary.businessName}`
        )}&body=${encodeURIComponent(
            `Inquiry Reference: ${receipt.inquiryId}\nName: ${receipt.summary.name}\nBusiness: ${receipt.summary.businessName}\nEmail: ${receipt.summary.email}\nPhone: ${fallbackFormData.phone || 'Not provided'}\nWebsite: ${fallbackFormData.websiteUrl || 'Not provided'}\nService: ${receipt.summary.serviceOfInterest}\nBudget: ${fallbackFormData.projectBudget || 'Not specified'}\n\nProject Goals:\n${fallbackFormData.projectGoals}`
        )}`
        : null;

    const handleCopyReference = async () => {
        try {
            await navigator.clipboard.writeText(receipt.inquiryId);
            setCopiedId(true);
            window.setTimeout(() => setCopiedId(false), 2200);
        } catch {
            setCopiedId(false);
        }
    };

    const handleSubmitAnother = () => {
        try {
            window.sessionStorage.removeItem(THANK_YOU_RECEIPT_STORAGE_KEY);
        } catch {
            // ignore storage errors
        }
        navigate('/contact', { replace: true });
    };

    return (
        <section
            aria-labelledby="thank-you-heading"
            className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28 bg-[#050505]"
        >
            {/* Subtle Brand Ambient Glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(ellipse_at_top,rgba(0,230,168,0.12),rgba(8,217,245,0.06)_45%,transparent_75%)]"
            />

            <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Main Confirmation Card */}
                <div
                    role="status"
                    aria-live="polite"
                    data-testid="contact-confirmation"
                    className="rounded-2xl border border-[#00E6A8]/35 bg-[#0B0D10] p-6 sm:p-10 lg:p-12 shadow-2xl"
                >
                    {/* Status Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                        <div className="inline-flex items-center gap-2.5 text-[#00E6A8]">
                            <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
                            <span className="font-mono text-xs uppercase tracking-widest">
                                Inquiry Confirmed · Submission Complete
                            </span>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#050505] px-3 py-1.5 font-mono text-xs text-[#A5AAB4]">
                            <span>Ref:</span>
                            <strong className="text-white">{receipt.inquiryId}</strong>
                            <button
                                type="button"
                                onClick={handleCopyReference}
                                aria-label="Copy inquiry reference ID"
                                className="ml-1 inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-[#08D9F5] hover:bg-white/5 transition-colors"
                            >
                                {copiedId ? (
                                    <>
                                        <Check className="h-3.5 w-3.5 text-[#00E6A8]" aria-hidden="true" />
                                        <span className="text-[#00E6A8]">Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Primary Heading & Personalized Confirmation */}
                    <div className="mt-8 max-w-3xl">
                        <h1
                            id="thank-you-heading"
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]"
                        >
                            Thank you,{' '}
                            <span className="gp-gradient-text">{receipt.summary.name}</span>.
                            <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl text-white/95">
                                Your project brief is in our hands.
                            </span>
                        </h1>

                        <p className="mt-4 text-base sm:text-lg text-[#A5AAB4] leading-relaxed">
                            {receipt.message} Our team will review the objectives for{' '}
                            <strong className="text-white font-semibold">
                                {receipt.summary.businessName}
                            </strong>{' '}
                            and reply directly to{' '}
                            <strong className="text-white font-semibold">
                                {receipt.summary.email}
                            </strong>{' '}
                            ({siteConfig.contact.responseWindow}).
                        </p>
                    </div>

                    {/* Diagnostic alert only if EmailJS returned a configuration notice */}
                    {!receipt.emailDispatched && receipt.emailError && (
                        <div
                            role="alert"
                            className="mt-6 rounded-xl border border-amber-500/40 bg-amber-950/25 p-4 text-xs sm:text-sm text-amber-200 space-y-2"
                        >
                            <div className="flex items-start gap-2.5 font-semibold text-amber-300">
                                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                                <span>Direct Dispatch Notice</span>
                            </div>
                            <p className="text-xs text-amber-100/90 leading-relaxed">
                                {receipt.emailError}
                            </p>
                        </div>
                    )}

                    {/* Inquiry Dossier Grid */}
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl border border-white/10 bg-[#050505] p-4">
                            <div className="font-mono text-[11px] uppercase tracking-wider text-[#A5AAB4]">
                                Organization
                            </div>
                            <div className="mt-1.5 text-sm font-semibold text-white break-words">
                                {receipt.summary.businessName}
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-[#050505] p-4">
                            <div className="font-mono text-[11px] uppercase tracking-wider text-[#A5AAB4]">
                                Primary Service Focus
                            </div>
                            <div className="mt-1.5 text-sm font-semibold text-[#08D9F5] break-words">
                                {receipt.summary.serviceOfInterest}
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-[#050505] p-4">
                            <div className="font-mono text-[11px] uppercase tracking-wider text-[#A5AAB4]">
                                Confirmation Email
                            </div>
                            <div className="mt-1.5 text-sm font-semibold text-white break-all">
                                {receipt.summary.email}
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-[#050505] p-4">
                            <div className="font-mono text-[11px] uppercase tracking-wider text-[#A5AAB4]">
                                Dispatch Status
                            </div>
                            <div className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#00E6A8]">
                                <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                                <span>
                                    {receipt.emailDispatched
                                        ? 'Delivered via EmailJS'
                                        : 'Recorded & Verified'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Optional Submitted Project Goals Preview */}
                    {fallbackFormData.projectGoals && (
                        <div className="mt-4 rounded-xl border border-white/10 bg-[#050505] p-4 sm:p-5">
                            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider text-[#A5AAB4]">
                                <span>Submitted Project Goals & Context</span>
                                {fallbackFormData.projectBudget && (
                                    <span className="text-[#08D9F5]">
                                        Estimated Budget: {fallbackFormData.projectBudget}
                                    </span>
                                )}
                            </div>
                            <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed whitespace-pre-line">
                                {fallbackFormData.projectGoals}
                            </p>
                        </div>
                    )}

                    {/* Fast-Track Priority Actions */}
                    <div className="mt-8 rounded-xl border border-[#08D9F5]/25 bg-[#050505]/90 p-5 sm:p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                            <div className="space-y-1">
                                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#08D9F5]">
                                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                                    <span>Want to Fast-Track Your Conversation?</span>
                                </div>
                                <p className="text-xs sm:text-sm text-[#A5AAB4]">
                                    You can also share your inquiry reference{' '}
                                    <span className="font-mono text-white">({receipt.inquiryId})</span>{' '}
                                    directly on WhatsApp for an immediate thread with our team.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <a
                                    href={whatsappFollowupHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#050505] hover:bg-[#1ebe5d] transition-colors whitespace-nowrap shrink-0"
                                >
                                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                                    <span>Fast-Track on WhatsApp</span>
                                </a>

                                {fallbackMailtoHref && (
                                    <a
                                        href={fallbackMailtoHref}
                                        className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#0B0D10] px-4 py-2.5 text-xs sm:text-sm font-medium text-white hover:border-[#08D9F5]/50 transition-colors whitespace-nowrap shrink-0"
                                    >
                                        <Mail className="h-4 w-4 text-[#08D9F5]" aria-hidden="true" />
                                        <span>Send Copy via Email App</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* What Happens Next — 3 Step Timeline */}
                    <div className="mt-10 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#08D9F5]">
                            <Clock className="h-4 w-4" aria-hidden="true" />
                            <span>What Happens Next</span>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                            {nextSteps.map((item) => (
                                <div
                                    key={item.step}
                                    className="rounded-xl border border-white/10 bg-[#050505] p-5 flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="font-mono text-xs font-semibold text-[#00E6A8]">
                                            STEP {item.step}
                                        </span>
                                        <h2 className="mt-2 text-base font-bold text-white">
                                            {item.title}
                                        </h2>
                                        <p className="mt-2 text-xs sm:text-sm text-[#A5AAB4] leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Navigation Bar */}
                    <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 rounded-lg gp-gradient-bg px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#050505] transition-transform hover:scale-[1.01] whitespace-nowrap"
                            >
                                <Home className="h-4 w-4" aria-hidden="true" />
                                <span>Back to Home</span>
                            </Link>

                            <Link
                                to="/projects"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#050505] px-4 py-2.5 text-xs sm:text-sm font-medium text-white hover:border-[#08D9F5]/50 transition-colors whitespace-nowrap"
                            >
                                <span>Explore Demo Concepts</span>
                                <ArrowRight className="h-4 w-4 text-[#08D9F5]" aria-hidden="true" />
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmitAnother}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#050505] px-4 py-2.5 text-xs sm:text-sm font-medium text-[#A5AAB4] hover:text-white hover:border-white/30 transition-colors whitespace-nowrap"
                        >
                            <RotateCcw className="h-4 w-4" aria-hidden="true" />
                            <span>Submit Another Inquiry</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
