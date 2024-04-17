"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  weight: z.coerce.number(),
});

const ProcessSubmitForm = (id: { id: number }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(id);
    console.log(values);
    try {
      const response = await fetch(
        `http://localhost:3001/api/progress/${id.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Produced_weight: values.weight,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      // Optionally, you may want to update the data after submission
      // Example: fetchData();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produced Weight</FormLabel>
              <FormControl>
                <Input placeholder="Enter in KGs." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ProcessSubmitForm;
