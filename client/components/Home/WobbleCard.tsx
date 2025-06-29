"use client";

import React from "react";
import { WobbleCard } from "../ui/wobble-card";

export function WobbleCardComponent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-[#F97315] min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Automate your workflow with MacroBridge
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Connect your favorite apps like Slack, Notion, and Google Drive to create powerful automations. MacroBridge saves you time by eliminating repetitive tasks—no code required.
          </p>
        </div>
        <img
          src="marcobridge-templates.png"
          width={500}
          height={500}
          alt="MacroBridge Integrations"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gray-900">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          One platform, endless possibilities
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          MacroBridge brings all your tools together, letting you build custom workflows that boost productivity and streamline your business processes.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Get started with MacroBridge today!
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Join teams who automate their daily tasks, integrate their favorite apps, and focus on what matters most. Try MacroBridge free—no credit card required.
          </p>
        </div>
        <img
          src="marcobridge-templates.png"
          width={600}
          height={500}
          alt="MacroBridge"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}