"use client";

import CVPage from "@/components/CVPage";
import Navbar from "@/components/Navbar";

export default async function CreateCv({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <CVPage cv_id={id}/>
    </>
  );
}
