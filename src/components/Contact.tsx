// TODO: Add real contact form, social links, and availability status

import { Mail, Linkedin, Github } from 'lucide-react';
import BlockReveal from './BlockReveal';

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen w-full bg-bg flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24"
    >
      <div className="max-w-3xl mx-auto w-full text-center flex flex-col items-center gap-8">
        {/* Availability pill */}
        <div className="flex items-center gap-2 bg-accent-green/10 border border-accent-green/25 text-accent-green text-xs font-sans font-medium px-4 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          Open to Senior PM · AI PM roles
        </div>

        <BlockReveal animateOnScroll>
          <h2 className="font-display font-semibold text-off-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            What are you building?
          </h2>
        </BlockReveal>

        <p className="text-muted-light font-sans text-lg leading-relaxed max-w-md">
          If you&rsquo;re building something that puts real people at the center of hard decisions — I&rsquo;d like to hear about it.
        </p>

        {/* CTA button */}
        <a
          href="mailto:janu.b.nair1@gmail.com"
          className="group flex items-center gap-3 bg-accent-purple hover:bg-accent-purple/90 text-white font-sans font-medium text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(127,119,221,0.3)]"
        >
          <Mail className="w-4 h-4" />
          Say hello
        </a>

        {/* Social links */}
        <div className="flex items-center gap-6 mt-4">
          {[
            { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/janu-balachandran/' },
            { icon: Github, label: 'GitHub', href: 'https://github.com/jaan-creates' },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-10 h-10 rounded-full border border-surface-border bg-surface flex items-center justify-center text-muted-light hover:text-off-white hover:border-accent-purple/40 hover:bg-accent-purple/10 transition-all duration-300"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Footer divider */}
        <div className="w-full border-t border-surface-border mt-16 pt-8 flex items-center justify-center text-xs text-muted font-sans">
          <span>© Janu</span>
        </div>
      </div>
    </section>
  );
}
