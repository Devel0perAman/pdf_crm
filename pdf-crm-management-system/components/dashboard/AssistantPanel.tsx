export default function AssistantPanel() {
  return (
    <div className="absolute right-10 top-16">

      <div className="w-[320px] rounded-[30px] bg-white/80 backdrop-blur-xl p-6 shadow-xl">

        <h3 className="font-semibold">
          AI Assistant
        </h3>

        <p className="text-sm text-gray-500">
          How can I help?
        </p>

        <div className="grid grid-cols-2 gap-3 mt-5">

          <button className="bg-white rounded-2xl p-4 border">
            Create PDF
          </button>

          <button className="bg-white rounded-2xl p-4 border">
            Analytics
          </button>

          <button className="bg-white rounded-2xl p-4 border">
            Share PDF
          </button>

          <button className="bg-white rounded-2xl p-4 border">
            Sign PDF
          </button>

        </div>

      </div>

    </div>
  );
}