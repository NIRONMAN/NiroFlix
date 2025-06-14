"use client"
import Stream from "@/components/Stream";
import { useParams } from "next/navigation";

function Page() {
  const {id}:{id:string}=useParams();
  return (
    <div>
{
        id && typeof(id)==="string" && <Stream id={id}></Stream>
      }
    </div>
  )
}

export default Page
