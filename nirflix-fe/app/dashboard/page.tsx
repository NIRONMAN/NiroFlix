"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { nixios } from "../lib/ApiClient";

function Page() {
  const [movies, setMovies] = useState<MediaFile[]>([]);
  useEffect(() => {
    (async () => {
      const res = await nixios.get("/api/movies/list");
      if (res.ok) {
        setMovies(res.data);
      }
    })();
  }, []);
  async function refreshDataBase() {
    await nixios.get("/api/movies/updateDb");
  }
  return (
    <div>
      <div className=" p-4 flex">
        {" "}
        <h1 className="text-center flex-1 text-2xl text-red-500">
          Welcome User
        </h1>
        <button onClick={refreshDataBase} className="p-2 rounded-md bg-white text-black">
          Refresh List
        </button>
      </div>
      <div className=" grid grid-cols-4 gap-4 p-4">
        {movies &&
          movies.length !== 0 &&
          movies.map((ele) => {
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
