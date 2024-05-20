import { createLazyFileRoute } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Link } from "@tanstack/react-router";
import { IoMdClose } from "react-icons/io";
import { removeFlashcard } from "../../redux/flashcardSlice";

export const Route = createLazyFileRoute("/show/")({
  component: Page,
});

function Page() {
  const flashcards = useAppSelector((state) => state.flashcards);
  const dispatch = useAppDispatch();

  if (flashcards.length === 0) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-3xl font-bold">It looks like a desert in here</h3>
          <Link
            to="/"
            className="rounded-md bg-blue-500 px-8 py-2 text-lg font-semibold text-white"
          >
            Create Flashcard
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mt-12 grid grid-cols-1 gap-x-4 gap-y-20 pb-8 sm:grid-cols-2 md:grid-cols-3">
        {flashcards.map((flashcard) => (
          <div
            className="relative rounded-lg bg-white p-4 shadow-md"
            key={flashcard.groupImage}
          >
            <img
              src={flashcard.groupImage}
              alt="flashcard image"
              className="absolute -top-12 left-1/2 size-24 -translate-x-1/2 rotate-0 rounded-full bg-white shadow"
            />
            <div
              className="absolute right-4 cursor-pointer"
              onClick={() => dispatch(removeFlashcard(flashcard.id))}
            >
              <IoMdClose
                className="text-red-500 transition-all duration-300 ease-in hover:rotate-90"
                size="2rem"
              />
            </div>
            <div className="mt-16 flex flex-col items-center">
              <h3 className="text-lg font-semibold">{flashcard.groupName}</h3>
              <p>{flashcard.groupDescription}</p>
              <p>{flashcard.terms.length} cards</p>
              <Link
                to="/show/$id"
                params={{ id: flashcard.id.toString() }}
                className="mt-2 rounded-md border-2 border-red-500 px-4 py-2 font-medium text-red-500"
              >
                View Card
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
