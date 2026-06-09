export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F5F6F8] flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-sm border">

        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="text-gray-500 mt-2">
          Sign in to PDF CRM
        </p>

        <form className="mt-8 space-y-5">

          <div>
            <label>Username</label>

            <input
              className="w-full mt-2 border rounded-2xl p-3"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label>Password</label>

            <input
              type="password"
              className="w-full mt-2 border rounded-2xl p-3"
              placeholder="Enter password"
            />
          </div>

          <button
            className="w-full bg-green-500 text-white rounded-2xl py-3"
          >
            Sign In
          </button>

        </form>

      </div>

    </main>
  );
}