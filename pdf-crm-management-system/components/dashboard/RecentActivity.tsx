export default function RecentActivity() {
  return (
    <div className="bg-white rounded-3xl border p-6">

      <h3 className="font-semibold text-lg mb-4">
        Recent Activity
      </h3>

      <div className="space-y-4">

        <div>
          <p>Agreement.pdf created</p>
          <span className="text-xs text-gray-500">
            5 mins ago
          </span>
        </div>

        <div>
          <p>Signature uploaded</p>
          <span className="text-xs text-gray-500">
            12 mins ago
          </span>
        </div>

        <div>
          <p>Share link generated</p>
          <span className="text-xs text-gray-500">
            25 mins ago
          </span>
        </div>

      </div>

    </div>
  );
}