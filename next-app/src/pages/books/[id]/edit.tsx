import { useGetBookByIdQuery, useUpdateBookMutation } from "@/rtk/api/booksApi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditBookPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publishedYear, setPublishedYear] = useState<number>(0);

  const { data: book, error, isLoading } = useGetBookByIdQuery(id as string);
  const [updateBook, { isLoading: isUpdating, isSuccess, error: updateError }] =
    useUpdateBookMutation();

  useEffect(() => {
    if (book) {
      setTitle(book.data.title);
      setAuthor(book.data.author);
      setPublishedYear(book.data.published_year);
    }
  }, [book]);

  const handleUpdateFormSubmit = async () => {
    try {
      await updateBook({
        id: id as string,
        updatedData: {
          title,
          author,
          published_year: publishedYear,
        },
      });
      router.push("/books");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(isLoading);

  if (!book) {
    return (
      <div>
        Here is nothing get back {"=>"} <Link href={"/books"}>Back</Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Update a Book with {id} ID</h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Book Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author Name
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="publishedYear"
            className="block text-sm font-medium text-gray-700"
          >
            Published Year
          </label>
          <input
            type="number"
            id="publishedYear"
            name="publishedYear"
            value={publishedYear}
            onChange={(e) => setPublishedYear(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          onClick={handleUpdateFormSubmit}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {isUpdating ? "Updating ...." : "Update Book"}
        </button>
      </div>
    </div>
  );
};

export default EditBookPage;
