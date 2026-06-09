import RecentActivity from "@/components/dashboard/RecentActivity";
export default function StatsGrid() {
  return (
   <div className="grid lg:grid-cols-3 gap-5 mt-8">

  <div className="lg:col-span-2 bg-white rounded-3xl border p-6">

    <h3 className="font-semibold text-lg mb-5">
      Recent PDFs
    </h3>

    <table className="w-full">

      <thead>
        <tr className="text-left">
          <th>Title</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>

        <tr className="border-t">
          <td className="py-4">Agreement.pdf</td>
          <td>Signed</td>
          <td>Today</td>
        </tr>

        <tr className="border-t">
          <td className="py-4">Contract.pdf</td>
          <td>Shared</td>
          <td>Yesterday</td>
        </tr>

      </tbody>

    </table>

  </div>

  <RecentActivity />

</div>
  );
}