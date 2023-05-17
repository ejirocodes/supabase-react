import "./App.css";
import supabase from "./config/supabase.client";
import { useEffect, useState } from "react";
import { Book } from "./types/collection";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);

  async function handleCreateBook() {
    const { data, error } = await supabase
      .from("book")
      .insert({ author, title, rating })
      .select()
      .single();
    if (error) {
      console.log(error);
      throw error;
    }
    setBooks([...books, data]);
    setTitle("");
    setAuthor("");
    setRating(0);
    setSelectedBook(null);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedBook) {
      handleUpdateBook();
    } else {
      handleCreateBook();
    }
  }

  async function handleBookDetails(id: number) {
    const { data } = await supabase.from("book").select().eq("id", id).single();
    if (data) {
      setSelectedBook(data);
      setTitle(data?.title || "");
      setAuthor(data?.author || "");
      setRating(data?.rating || 0);
    }
  }

  async function handleUpdateBook() {
    const { data, error } = await supabase
      .from("book")
      .update({ author, rating, title })
      .eq("id", selectedBook?.id).select()
      .single();
    if (data) {
      const updatedBooks = books.map((book) => {
        if (book.id === data.id) {
          return data;
        }
        return book;
      });
      setBooks(updatedBooks);
    }
  }

  async function handleDeleteBoo(id: number) {
    const { data, error } = await supabase.from('book').delete().eq('id', id).select().single()
      if(data) {
          const updatedBooks = books.filter(book => book.id !== data.id)
          setBooks(updatedBooks);
      }
  }
  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase.from("book").select();
      if (error) {
        console.log({ error });
        throw error;
      }
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <>
      <div className="page home">
        <h1>Supabase + React + Typescript</h1>
        <div className="books-grid">
          {books.map((book) => (
            <button
              key={book.id}
              className="books-card text-left cursor-pointer flex flex-col"
              onClick={() => handleBookDetails(book.id)}
            >
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <div className="rating">{book.rating}</div>
              <button
                className="items-end justify-end w-full"
                onClick={() => handleDeleteBoo(book.id)}
              >
                Delete
              </button>
            </button>
          ))}
        </div>
        <div className="page create">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={author}
              required
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
            />
            <button type="submit" className="bg-green-600">
              {selectedBook ? "Update Book" : "Create Book"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
