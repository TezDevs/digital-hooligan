import Link from "next/link";
import Container from "./Container";

function GitHubIcon() {
    return (
        <svg
            aria-hidden="true"
            className="h-3.5 w-3.5 flex-none"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.26 3.39.96.11-.75.41-1.26.74-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.75.8 1.2 1.83 1.2 3.09 0 4.43-2.7 5.41-5.27 5.7.42.36.8 1.08.8 2.18 0 1.57-.01 2.83-.01 3.22 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg
            aria-hidden="true"
            className="h-3.5 w-3.5 flex-none"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6A2.5 2.5 0 1 1 4.98 3.5ZM4.75 8H0.75V23H4.75V8ZM9.75 8H5.75V23H9.75V15.26C9.75 11.76 14.25 11.46 14.25 15.26V23H18.25V14.16C18.25 7.96 11.5 8.19 9.75 11.11V8Z" />
        </svg>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-dh-street-gray/60 bg-dh-black/95">
            <Container>
                <div className="flex flex-col gap-3 py-6 text-xs text-dh-street-gray sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <p className="font-mono uppercase tracking-[0.22em] text-[0.65rem] text-dh-street-gray">
                            Digital Hooligan
                        </p>
                        <p className="text-[0.75rem]">
                            © {year} Digital Hooligan. Built by Courtez “Tez” Cannady. Break the rules, not the
                            uptime.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="https://github.com/TezDevs"
                            className="inline-flex items-center gap-1 text-[0.75rem] underline-offset-4 hover:text-dh-electric-mint hover:underline"
                        >
                            <GitHubIcon />
                            <span>TezDevs</span>
                        </Link>
                        <Link
                            href="https://linkedin.com/in/courtez-cannady-a8588a108"
                            className="inline-flex items-center gap-1 text-[0.75rem] underline-offset-4 hover:text-dh-electric-mint hover:underline"
                        >
                            <LinkedInIcon />
                            <span>Courtez M. Cannady</span>
                        </Link>
                        <span className="hidden h-1 w-1 rounded-full bg-dh-street-gray sm:inline-block" />
                        <Link
                            href="#apps"
                            className="text-[0.75rem] underline-offset-4 hover:text-dh-electric-mint hover:underline"
                        >
                            Apps
                        </Link>
                        <Link
                            href="#labs"
                            className="text-[0.75rem] underline-offset-4 hover:text-dh-electric-mint hover:underline"
                        >
                            Labs
                        </Link>
                        <Link
                            href="#contact"
                            className="text-[0.75rem] underline-offset-4 hover:text-dh-electric-mint hover:underline"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
