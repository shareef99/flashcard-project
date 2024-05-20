import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { MdOutlineImage } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../redux/store";
import { addFlashcard } from "../redux/flashcardSlice";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const schema = z.object({
  groupName: z.string().min(1, "Required"),
  groupDescription: z.string().min(1, "Required"),
  groupImage: z.string().min(1, "Required"),
  terms: z.array(
    z.object({
      name: z.string().min(1, "Required"),
      description: z.string().min(1, "Required"),
      image: z.string().min(1, "Required"),
    }),
  ),
});

type FormValues = z.infer<typeof schema>;

function Index() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate({ from: "/" });

  // Form
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      groupName: "",
      groupDescription: "",
      terms: [{ name: "", description: "" }],
    },
    mode: "all",
    resolver: zodResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({ control, name: "terms" });

  // Functions
  const submitHandler: SubmitHandler<FormValues> = (data) => {
    dispatch(addFlashcard({ id: Math.random(), ...data }));
    navigate({ from: "/", to: "/show" });
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(submitHandler, (err) => console.log(err))}
        className="flex flex-col gap-8 text-gray-500"
      >
        <div className="flex flex-col gap-4 rounded-lg bg-white p-4">
          <div className="flex items-start gap-2">
            <div className="flex flex-grow flex-col gap-2">
              <label htmlFor="group-name">Enter Group Name</label>
              <input
                type="text"
                id="group-name"
                className="rounded-md border-2 border-solid border-gray-400 placeholder:mx-2 hover:border-gray-500 focus:border-gray-500 focus:ring-0"
                placeholder="Enter Group Name"
                {...register("groupName", { required: true })}
              />
              {errors.groupName?.message && (
                <span className="text-red-500">
                  {errors.groupName?.message}
                </span>
              )}
            </div>
            <div>
              <button
                className={twMerge(
                  "mt-8 flex items-center gap-1 rounded-md border-2 border-solid border-blue-500 px-4 py-1.5 text-blue-500 transition-all duration-300 ease-in",
                  "hover:bg-blue-500 hover:text-white",
                  "focus:border-blue-500 focus:bg-blue-500 focus:text-white focus:ring-0",
                )}
                type="button"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.multiple = false;

                  input.onchange = () => {
                    const files = input.files;
                    const file = files?.[0];
                    if (!file) return;

                    if (file.size > 1024 * 1024) {
                      alert("File must be less than 1 MB");
                      return;
                    }

                    const reader = new FileReader();
                    reader.onloadend = () => {
                      if (!reader.result) return;
                      const base64 = reader.result as string;
                      setValue("groupImage", base64);
                    };
                    reader.readAsDataURL(file);
                  };

                  input.click();
                }}
              >
                <MdOutlineImage size="1.5rem" />
                <span className="text-lg font-semibold">Upload</span>
              </button>
              {errors.groupImage?.message && (
                <span className="text-red-500">
                  {errors.groupImage?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="group-description">Enter Group Description</label>
            <textarea
              id="group-description"
              className="rounded-md border-2 border-solid border-gray-400 placeholder:mx-2 hover:border-gray-500 focus:border-gray-500 focus:ring-0"
              placeholder="Enter Group Description"
              {...register("groupDescription", { required: true })}
            />
            {errors.groupDescription?.message && (
              <span className="text-red-500">
                {errors.groupDescription?.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-lg bg-white p-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col items-start gap-4 md:flex-row"
            >
              <div className="my-auto flex size-9 items-center justify-center rounded-full bg-red-500 text-white">
                {index + 1}
              </div>
              <div className="flex w-full flex-col gap-2 md:w-fit">
                <label htmlFor="name">Enter Term Name</label>
                <input
                  type="text"
                  id="name"
                  className="rounded-md border-2 border-solid border-gray-400 placeholder:mx-2 hover:border-gray-500 focus:border-gray-500 focus:ring-0"
                  placeholder="Enter Term Name"
                  {...register(`terms.${index}.name`, { required: true })}
                />
                {errors.terms?.[index]?.name?.message && (
                  <span className="text-red-500">
                    {errors.terms?.[index]?.name?.message}
                  </span>
                )}
              </div>
              <div className="flex w-full flex-grow flex-col gap-2 md:w-fit">
                <label htmlFor="description">Enter Group description</label>
                <textarea
                  id="description"
                  className="rounded-md border-2 border-solid border-gray-400 placeholder:mx-2 hover:border-gray-500 focus:border-gray-500 focus:ring-0"
                  placeholder="Enter Group Description"
                  {...register(`terms.${index}.description`, {
                    required: true,
                  })}
                />
                {errors.terms?.[index]?.description?.message && (
                  <span className="text-red-500">
                    {errors.terms?.[index]?.description?.message}
                  </span>
                )}
              </div>
              <div>
                <button
                  className={twMerge(
                    "flex items-center gap-1 rounded-md border-2 border-solid border-blue-500 px-4 py-1.5 text-blue-500 transition-all duration-300 ease-in md:mt-8",
                    "hover:bg-blue-500 hover:text-white",
                    "focus:border-blue-500 focus:bg-blue-500 focus:text-white focus:ring-0",
                  )}
                  type="button"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.multiple = false;

                    input.onchange = () => {
                      const files = input.files;
                      const file = files?.[0];
                      if (!file) return;

                      const reader = new FileReader();
                      reader.onloadend = () => {
                        if (!reader.result) return;
                        const base64 = reader.result as string;
                        setValue(`terms.${index}.image`, base64);
                      };
                      reader.readAsDataURL(file);
                    };

                    input.click();
                  }}
                >
                  <MdOutlineImage size="1.5rem" />
                  <span className="text-lg font-semibold">Upload</span>
                </button>
                {errors.terms?.[index]?.image?.message && (
                  <span className="text-red-500">
                    {errors.terms?.[index]?.image?.message}
                  </span>
                )}
              </div>
              {fields.length > 1 && (
                <button
                  onClick={() => remove(index)}
                  className="md:mt-8"
                  type="button"
                >
                  <IoMdTrash size="2rem" className="text-red-500" />
                </button>
              )}
            </div>
          ))}
          <button
            className="w-fit text-start font-bold text-blue-500"
            onClick={() => append({ name: "", description: "", image: "" })}
            type="button"
          >
            Add More+
          </button>
        </div>
        <button
          type="submit"
          className="mx-auto mb-4 flex rounded-md bg-red-500 px-16 py-2 font-semibold text-white hover:bg-red-600"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
