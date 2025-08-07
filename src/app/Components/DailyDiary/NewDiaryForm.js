"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { UploadCloud, Pencil } from "lucide-react";

// Schema to handle an array of files and optional text fields
const diaryFormSchema = z.object({
  date: z.date({ required_error: "A date is required." }),
  category: z.string().min(1, "Please select a category."),
  subject: z
    .string()
    .max(100, "Subject must be 100 characters or less.")
    .optional(),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less.")
    .optional(),
  artworkPhotos: z
    .array(z.instanceof(File))
    .nonempty("Please upload at least one photo."),
  studioLife: z
    .string()
    .max(500, "This field must be 500 characters or less.")
    .optional(),
});

export default function NewDiaryForm() {
  const [files, setFiles] = useState([]);

  const form = useForm({
    resolver: zodResolver(diaryFormSchema),
    defaultValues: {
      subject: "",
      description: "",
      studioLife: "",
      artworkPhotos: [],
    },
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      form.setValue(
        "artworkPhotos",
        [...form.getValues("artworkPhotos"), ...acceptedFiles],
        { shouldValidate: true }
      );
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
  });

  const removeFile = (fileToRemove) => {
    URL.revokeObjectURL(fileToRemove.preview);
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    form.setValue("artworkPhotos", updatedFiles, { shouldValidate: true });
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Diary uploaded! Check the console for the form data.");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 w-full max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">New Diary</h2>
        <Button variant="outline">Save as draft</Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Date</FormLabel>
                <FormControl>
                  <DatePicker date={field.value} setDate={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="eg: For Sale" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="for-sale">For Sale</SelectItem>
                    <SelectItem value="personal-work">Personal Work</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Write down the description in 500 letters"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write down the description in 500 letters"
                    className="resize-none h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="artworkPhotos"
            render={() => (
              <FormItem>
                <FormLabel>
                  Upload high resolution photo of your artwork
                </FormLabel>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div
                    {...getRootProps()}
                    className="w-full md:w-1/2 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center text-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input {...getInputProps()} />
                    <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm">
                      {isDragActive
                        ? "Drop the files here..."
                        : "click or drag to upload photo"}
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Upload Guidelines
                    </h4>
                    <ul className="text-xs text-gray-500 list-disc list-inside space-y-1">
                      <li>File format: JPG / PNG</li>
                      <li>Minimum size: 2000px (longest side), 300 dpi</li>
                      <li>Max file size: 25MB</li>
                      <li>Clean background, even lighting</li>
                      <li>No watermarks, logos, or composite images</li>
                    </ul>
                  </div>
                </div>
                <FormMessage />

                {files.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-4">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="relative w-24 h-24 rounded-lg overflow-hidden border"
                      >
                        <Image
                          src={file.preview}
                          alt={`preview ${index}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(file)}
                          className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700 transition-colors"
                        >
                          <Pencil className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studioLife"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Life in the studio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write down the description in 500 letters"
                    className="resize-none h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            Upload Diary
          </Button>
        </form>
      </Form>
    </div>
  );
}
