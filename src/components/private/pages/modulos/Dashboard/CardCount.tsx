"use client";

import { useDashboardAccessCount } from "@/hooks/useDashboard";

export default function CardCount() {
  const { data, isLoading } = useDashboardAccessCount();

  if (isLoading || !data)
    return (
      <div className="flex flex-col gap-2 sm:flex-row max-w-sm">
        <div className="mx-auto w-full max-w-sm rounded-md border border-slate-200 p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-slate-300"></div>
                </div>
                <div className="h-2 rounded bg-slate-300"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm rounded-md border border-slate-200 p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-slate-300"></div>
                </div>
                <div className="h-2 rounded bg-slate-300"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm rounded-md border border-slate-200 p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-slate-300"></div>
                </div>
                <div className="h-2 rounded bg-slate-300"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm rounded-md border border-slate-200 p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-slate-300"></div>
                </div>
                <div className="h-2 rounded bg-slate-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <div className="flex flex-col items-center justify-center rounded-md border-[1px] bg-white p-4">
        <h3 className="font-serif text-lg font-bold text-slate-800">
          {data.districtCount ?? "0"}
        </h3>
        <p className="font-serif text-xs text-slate-500">Distrital</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-md border-[1px] bg-white p-4">
        <h3 className="font-serif text-lg font-bold text-slate-800">
          {data.partyCount ?? "0"}
        </h3>
        <p className="font-serif text-xs text-slate-500">Nacional</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-md border-[1px] bg-white p-4">
        <h3 className="font-serif text-lg font-bold text-slate-800">
          {data.stateCount ?? "0"}
        </h3>
        <p className="font-serif text-xs text-slate-500">Estadual</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-md border-[1px] bg-white p-4">
        <h3 className="font-serif text-lg font-bold text-slate-800">
          {data.cityCount ?? "0"}
        </h3>
        <p className="font-serif text-xs text-slate-500">Municipal</p>
      </div>
    </div>
  );
}
