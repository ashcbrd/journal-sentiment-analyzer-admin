import Link from "next/link";
import response from "../../data/journals.json";

const JournalPage = () => {
  const journals = response.data;

  return (
    <div>
      <div className="w-full grid grid-cols-3 gap-10">
        {journals.map((journal, index) => (
          <Link
            href={`/journal/${journal._id}`}
            className="cursor-pointer hover:bg-gray-50 h-20 flex w-[300px] items-center justify-center px-10 rounded bg-white shadow-md shadow-gray-200"
            key={index}
          >
            <p className="text-xl font-semibold">{journal.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
