export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-3xl border p-6">

      <h2 className="text-xl font-semibold mb-5">
        Recent Activity
      </h2>

      <div className="space-y-4">

        <div>
          <p>System Initialized</p>
          <span className="text-xs text-gray-500">
            Just now
          </span>
        </div>

      </div>

    </div>
  );
}