export default function Contact() {
    return (
        <section
            id="contact"
            className="border-t border-dh-street-gray/60 bg-dh-black/95"
        >
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
                <div className="max-w-xl">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">
                        Contact
                    </h2>
                    <p className="mt-2 max-w-md text-sm text-dh-street-gray sm:text-base">
                        Whether you want to collaborate, hire me for a problem, or just
                        trade ideas about weird apps — I read everything.
                    </p>

                    <ul className="mt-5 space-y-3 text-sm text-dh-street-gray">
                        <li className="flex items-center gap-2">
                            <span className="text-dh-electric-mint">📞</span>
                            <span>540-287-6266</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-dh-electric-mint">✉️</span>
                            <span>ceo@digitalhooligan.io</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-dh-electric-mint">💻</span>
                            <a
                                href="https://github.com/TezDevs"
                                target="_blank"
                                rel="noreferrer"
                                className="underline decoration-dh-electric-mint/60 underline-offset-2 hover:text-white"
                            >
                                github.com/TezDevs
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
