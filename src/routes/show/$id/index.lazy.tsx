import { createLazyFileRoute } from "@tanstack/react-router";
import { useAppSelector } from "../../../redux/store";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { MdShare, MdDownload, MdPrint } from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  // PDF
  const pdf = new jsPDF();

  const img = flashcard.groupImage;

  pdf.addImage(img, "JPEG", 15, 50, 40, 40);

  pdf.setTextColor(240, 128, 128);
  pdf.setFontSize(22);
  pdf.text("Flash Cards PDF", 20, 20);

  // Reset text color
  pdf.setTextColor(0, 0, 0);

  // Set font size for content
  pdf.setFontSize(14);

  // Add group information to the PDF
  pdf.text(`Group Name: ${flashcard.groupName}`, 20, 30);
  pdf.text(`Group Description: ${flashcard.groupDescription}`, 20, 40);

  // We are importing jsPDF-autotable it will add the function to the pdf object
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pdf.autoTable({
    startY: 100,
    head: [["Term Name", "Description"]],
    body: flashcard.terms.map((term) => [term.name, term.description]),
    theme: "grid", // Use the 'grid' theme for table borders
    styles: { halign: "center" },
    headStyles: { fillColor: [255, 31, 31] },
    alternateRowStyles: { fillColor: [255, 230, 230] },
    tableLineColor: [224, 0, 0],
    tableLineWidth: 0.1,
  });

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
                    "font-semibold text-black",
                    selectedTerm === i && "font-bold text-red-500",
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
          <button
            className={twMerge(
              "flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 font-bold text-black",
              "transition-all duration-300 ease-in",
              "hover:bg-red-500 hover:text-white",
            )}
          >
            <MdShare size="1.5rem" /> <span className="text-lg">Share</span>
          </button>
          <button
            className={twMerge(
              "flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 font-bold text-black",
              "transition-all duration-300 ease-in",
              "hover:bg-red-500 hover:text-white",
            )}
            onClick={() => pdf.save(`flashcard ${flashcard.groupName}.pdf`)}
          >
            <MdDownload size="1.5rem" />{" "}
            <span className="text-lg">Download</span>
          </button>
          <button
            className={twMerge(
              "flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 font-bold text-black",
              "transition-all duration-300 ease-in",
              "hover:bg-red-500 hover:text-white",
            )}
          >
            <MdPrint size="1.5rem" /> <span className="text-lg">Print</span>
          </button>
        </div>
      </div>
    </section>
  );
}
