export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-2xl bg-green-500 text-white flex items-center justify-center font-bold">
        P
      </div>

      <div>
        <h2 className="font-bold">
          PDF CRM
        </h2>

        <p className="text-xs text-gray-500">
          Management System
        </p>
      </div>
    </div>
  );
}