import { useNavigate } from "react-router-dom";

function LearnMore() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-green-700">🌱 How to Use the Carbon Footprint Tracker</h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-green-600">1. Create an Account</h2>
          <p>Click on <strong>Register</strong> to sign up with your email. Once registered, you can log in securely and begin tracking your footprint.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-600">2. Log Your Activities</h2>
          <p>Head to the <strong>Log Activity</strong> page to enter details about your transportation, food habits, energy usage, and more. The system will calculate the CO₂ emissions for each.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-600">3. Monitor Your Dashboard</h2>
          <p>On the <strong>Dashboard</strong>, view charts that track your emissions by category and over time. Get insights and suggestions based on your habits.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-600">4. Set Weekly Goals</h2>
          <p>Use the <strong>Goals</strong> page to set your CO₂ reduction goals. Your weekly summary will help you track progress toward a more sustainable lifestyle.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-600">5. Earn Achievements</h2>
          <p>Get rewarded for consistency and hitting targets! The <strong>Achievements</strong> section celebrates your journey with badges and milestones.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-600">6. Compete on the Leaderboard</h2>
          <p>See how your efforts stack up against others on the <strong>Leaderboard</strong>. Friendly competition motivates sustainable change!</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-600">7. Update Your Profile</h2>
          <p>Manage your information and preferences from the <strong>Profile</strong> section. You can also change your password and upload a profile picture.</p>
        </section>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default LearnMore;
