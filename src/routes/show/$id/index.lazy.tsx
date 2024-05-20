import { createLazyFileRoute } from "@tanstack/react-router";
import { useAppSelector } from "../../../redux/store";
import { twMerge } from "tailwind-merge";
import { useRef, useState } from "react";
import {
  MdEmail,
  MdShare,
  MdDownload,
  MdPrint,
  MdCopyAll,
} from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

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

  // Ref
  const dialogRef = useRef<HTMLDialogElement>(null);

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
      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-[100px_1fr_100px] md:gap-4 lg:grid-cols-[200px_1fr_200px]">
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
        <div className="flex flex-col gap-4 rounded-md bg-white p-4 md:flex-row">
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
        <div className="mb-8 flex flex-col gap-4 md:mb-0">
          <button
            className={twMerge(
              "flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 font-bold text-black",
              "transition-all duration-300 ease-in",
              "hover:bg-red-500 hover:text-white",
            )}
            onClick={() => dialogRef.current?.showModal()}
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
            onClick={() => {
              window.open(pdf.output("bloburl"), "_blank");
            }}
          >
            <MdPrint size="1.5rem" /> <span className="text-lg">Print</span>
          </button>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        onClick={(event) => {
          event.target.addEventListener("click", (e) => {
            // We checked by logging the value of the id, it is a string
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const id = e.target.id;
            if (id === "dialog") {
              dialogRef.current?.close();
            }
          });
        }}
        className="rounded-lg bg-white shadow"
        id="dialog"
      >
        <div id="dialog-content" className="p-4">
          <div>
            <h1 className="text-xl font-bold">Share</h1>
            <IoMdClose
              onClick={() => dialogRef.current?.close()}
              className="absolute right-2 top-2 cursor-pointer text-3xl text-red-500 transition-all duration-200 ease-linear hover:rotate-90"
            />
            <div className="flex flex-row items-center gap-2 p-3">
              <p className="flex w-full justify-between gap-2 rounded-lg border-2 p-2">
                <span className="w-fit truncate">{window.location.href}</span>
              </p>
              <MdCopyAll
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Copied to clipboard");
                }}
                className="cursor-pointer text-3xl hover:text-red-500"
              />
            </div>
            <div className="relative mx-auto flex h-1/2 w-11/12 justify-between gap-5 overflow-hidden p-3 transition-all duration-500 ease-linear md:w-10/12">
              <FaWhatsapp
                onClick={() =>
                  window.open("https://web.whatsapp.com/", "_blank")
                }
                className="cursor-pointer rounded-full text-4xl text-green-500"
              />
              <FaFacebook
                onClick={() =>
                  window.open("https://www.facebook.com/", "_blank")
                }
                className="cursor-pointer rounded-full text-4xl text-blue-500"
              />
              <FaLinkedin
                onClick={() =>
                  window.open("https://www.linkedin.com/", "_blank")
                }
                className="cursor-pointer rounded-full text-4xl text-blue-500"
              />
              <FaTwitter
                onClick={() => window.open("https://twitter.com/", "_blank")}
                className="cursor-pointer rounded-full text-4xl text-blue-500"
              />
              <MdEmail
                onClick={() =>
                  window.open("https://gmail.google.com", "_blank")
                }
                className="cursor-pointer rounded-full text-4xl text-red-500"
              />
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
}
