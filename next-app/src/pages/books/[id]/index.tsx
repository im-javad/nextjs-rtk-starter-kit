import { useDeleteBookMutation, useGetBookByIdQuery } from "@/rtk/api/booksApi";
import Link from "next/link";
import { useRouter } from "next/router";

const BookPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: book, error, isLoading } = useGetBookByIdQuery(id as string);
  const bookDetails = book?.data;

  const [deleteBook] = useDeleteBookMutation();
  const handleDeleteBook = async () => {
    deleteBook(id as string);
    router.push("/books");
  };

  if (isLoading) return <strong>Loading...</strong>;
  if (error) return <strong>Errror Occurred</strong>;
  if (!book) return <p>No book is here</p>;
  
  return (
    <>
      <div className="book">
        <div>ID is : {bookDetails?.id}</div>
        <div>Title is : {bookDetails?.title}</div>
        <div>Author is : {bookDetails?.author}</div>
        <div>Published Year is : {bookDetails?.published_year}</div>
        <div>Created At is : {bookDetails?.created_at}</div>
        <div className="operations mt-7">
          <Link
            href={`/books/${id}/edit`}
            className="bg-blue-500 py-3 rounded px-5"
          >
            Edit The Book
          </Link>
          <button
            className="bg-red-500 py-3 rounded px-5 ms-4"
            onClick={handleDeleteBook}
          >
            Delete The Book
          </button>
        </div>
      </div>
    </>
  );
};

export default BookPage;
