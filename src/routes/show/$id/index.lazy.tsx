import { createLazyFileRoute } from "@tanstack/react-router";
import { useAppSelector } from "../../../redux/store";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { MdShare, MdDownload, MdPrint } from "react-icons/md";

export const Route = createLazyFileRoute("/show/$id/")({
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const flashcards = useAppSelector((state) => state.flashcards);
  const flashcard = flashcards.find((flashcard) => flashcard.id === Number(id));

  // State
  // Index of the selected term
  const [selectedTerm, setSelectedTerm] = useState<number>(0);

  if (!flashcard) {
    return <div>Flashcard not found</div>;
  }

  return (
    <section>
      <div>
        <h1 className="text-xl font-semibold">{flashcard.groupName}</h1>
        <p>{flashcard.groupDescription}</p>
      </div>
      <div className="mt-4 grid grid-cols-[200px_1fr_200px] gap-8">
        <div className="rounded-md bg-white p-4">
          <span className="font-bold text-gray-500">Flashcards</span>
          <div>
            {flashcard.terms.map((term, i) => (
              <div key={i}>
                <button
                  className={twMerge(
                    "font-semibold text-gray-700",
                    selectedTerm === i && "text-red-500",
                  )}
                  onClick={() => setSelectedTerm(i)}
                >
                  {term.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 rounded-md bg-white p-4">
          <div>
            <img
              src={flashcard.terms[selectedTerm].image}
              alt="flashcard term image"
              className="h-60 w-80"
            />
          </div>
          <div>
            <span>{flashcard.terms[selectedTerm].description}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button className="flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 font-bold text-black transition-all duration-300 ease-in hover:bg-red-500 hover:text-white">
            <MdShare size="1.5rem" /> <span className="text-lg">Share</span>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 font-bold text-black transition-all duration-300 ease-in hover:bg-red-500 hover:text-white">
            <MdDownload size="1.5rem" />{" "}
            <span className="text-lg">Download</span>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 font-bold text-black transition-all duration-300 ease-in hover:bg-red-500 hover:text-white">
            <MdPrint size="1.5rem" /> <span className="text-lg">Print</span>
          </button>
        </div>
      </div>
    </section>
  );
}
