"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const [movies, setMovies] = useState<MediaFile[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/movies/list",
      );
      setMovies(await res.json());
    })();
  }, []);
  return (
    <div>
      <h1>Welcome User</h1>
      <div className=" grid grid-cols-4 gap-4 p-4">
        {movies.map((ele) => {
          return <MovieCard key={ele.id} {...ele}></MovieCard>;
        })}
      </div>
    </div>
  );
}

export default Page;

type MediaFile = {
  id: string;
  title: string;
  url: string;
  size: string; // You might use number if you want to treat size as bytes
  duration: string; // ISO 8601 or HH:MM:SS.SSS format
};

function MovieCard({ id, duration, title }: MediaFile) {
  const router = useRouter();
  return (
    <div
      key={id}
      className="rounded-xl col-span-1 h-36  bg-neutral-800 p-4 "
      onClick={() => {
        router.push("/stream/" + id);
      }}
    >
      <h1 className="break-words">Title : {title}</h1>
      <p>Duration : {duration}</p>
    </div>
  );
}
