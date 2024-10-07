import { useGetBooksQuery } from "@/rtk/api/booksApi";
import Link from "next/link";

const BooksPage: React.FC = () => {
  const { data: books, error, isLoading } = useGetBooksQuery();

  if (isLoading) return <strong>Loading....</strong>;
  if (error) return <strong>ERROR Occurred</strong>;

  return (
    <>
      <div className="mb-10 border-4 border-x-amber-950 p-4">
        Create a one book {"=>"}{" "}
        <Link
          href={"/books/new"}
          className=" bg-black text-[#ffff] p-2 rounded-lg"
        >
          Go to space
        </Link>
      </div>
      <div className="books flex flex-col justify-center">
        {books?.data.map((book) => (
          <div
            key={book.id}
            className="book mb-10 border-2 border-cyan-700 p-6 flex flex-col"
          >
            <div>Title is : {book.title}</div>
            <div>Author is : {book.author}</div>
            <div>Published Year is : {book.author}</div>
            <button>
              Go My Details is :{" "}
              <Link
                href={`/books/${book.id}`}
                className=" bg-amber-600 p-2 rounded-lg"
              >
                DETAILS
              </Link>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default BooksPage;
