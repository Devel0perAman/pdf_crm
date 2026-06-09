import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  icon,
}: StatsCardProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6">
  
  <div className="xl:col-span-2 bg-white rounded-3xl p-6 border shadow-sm">
    
    <h2 className="font-semibold text-xl mb-4">
      Latest PDF Preview
    </h2>

    <div className="h-[350px] bg-gray-100 rounded-2xl flex items-center justify-center">
      PDF Preview Area
    </div>
    <div className="bg-white rounded-3xl p-6 border shadow-sm mt-6">

  <h2 className="font-semibold text-xl mb-5">
    Recent Activity
  </h2>

  <div className="space-y-4">

    <div className="flex justify-between">
      <span>Created Agreement.pdf</span>
      <span className="text-gray-500">
        2 min ago
      </span>
    </div>

    <div className="flex justify-between">
      <span>Updated Contract.pdf</span>
      <span className="text-gray-500">
        10 min ago
      </span>
    </div>

    <div className="flex justify-between">
      <span>Generated Share Link</span>
      <span className="text-gray-500">
        25 min ago
      </span>
    </div>

  </div>

</div>

  </div>

  <div className="bg-white rounded-3xl p-6 border shadow-sm">
    
    <h2 className="font-semibold text-xl mb-4">
      Quick Actions
    </h2>

    <div className="space-y-3">

      <button className="w-full bg-green-500 text-white rounded-xl py-3">
        Create PDF
      </button>

      <button className="w-full border rounded-xl py-3">
        Add Signature
      </button>

      <button className="w-full border rounded-xl py-3">
        Share PDF
      </button>

    </div>

  </div>

</div>
  );
}