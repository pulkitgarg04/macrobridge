import React from "react";

const integrations = [
  {
    name: "Slack",
    url: "https://slack.com",
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg"
        alt="Slack"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "Notion",
    url: "https://notion.so",
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg"
        alt="Notion"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "Google Drive",
    url: "https://drive.google.com",
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googledrive.svg"
        alt="Google Drive"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com",
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg"
        alt="GitHub"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "Discord",
    url: "https://discord.com",
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/discord.svg"
        alt="Discord"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "Trello",
    url: "https://trello.com",
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/trello.svg"
        alt="Trello"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "Zoom",
    url: "https://zoom.us",
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zoom.svg"
        alt="Zoom"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "Dropbox",
    url: "https://dropbox.com",
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/dropbox.svg"
        alt="Dropbox"
        className="h-10 w-10"
      />
    ),
  },
];

export default function Integration() {
  return (
    <section id="integrations" className="py-20">
      <div className="py-16">
        <div className="container mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F97315] mb-4">
            Connect with 1000+ apps
          </h2>
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Integrates with your favorite tools
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 bg-gray-800/60 rounded-2xl p-8 border border-gray-700 shadow-lg">
            {integrations.map((integration) => (
              <a
                key={integration.name}
                href={integration.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="bg-white/10 rounded-xl p-4 flex items-center justify-center transition group-hover:bg-white/50">
                  {integration.icon}
                </div>
                <span className="mt-3 text-sm text-gray-300 group-hover:text-white font-medium">
                  {integration.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
