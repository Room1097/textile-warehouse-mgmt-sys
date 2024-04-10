"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const completeProgressSchema = z.object({
  proID: z.string()
});

const CompleteProgress = () => {
  return (
    <div className="flex flex-col gap-12">
      <h1>Complete Progress</h1>
    </div>
  );
};

export default CompleteProgress;
