export default function JobCard({ job }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">

      <h2 className="font-semibold">{job.title}</h2>

      <p className="text-sm text-gray-500">
        📍 {job.location}
      </p>

      <p className="text-blue-600 font-bold">
        {job.salary}
      </p>

      <button className="mt-3 w-full py-2 bg-green-600 text-white rounded-lg">
        Candidatar-se
      </button>

    </div>
  );
}