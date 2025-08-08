"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/Components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/Components/ui/select";
import { DatePicker } from "@/app/Components/ui/date-picker";
import { Input } from "@/app/Components/ui/input";
import { Textarea } from "@/app/Components/ui/textarea";
import { Button } from "@/app/Components/ui/button";
import { UploadCloud, Trash2, Loader2, X } from "lucide-react";
import { parseISO, startOfToday } from "date-fns";

const diaryFormSchema = z.object({
  date: z.date({ required_error: "A date is required." }),
  category: z.string().min(1, "Please select a category."),
  subject: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  artworkPhotos: z.array(z.any()).nonempty("Please upload at least one photo."),
  studioLife: z.string().max(500).optional(),
});

export default function NewDiaryForm() {
  const [files, setFiles] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const entryId = params.entryId;
  const isEditMode = !!entryId;
  const preselectedDate = searchParams.get("date");

  const form = useForm({
    resolver: zodResolver(diaryFormSchema),
    defaultValues: {
      subject: "",
      description: "",
      studioLife: "",
      artworkPhotos: [],
      date: preselectedDate ? parseISO(preselectedDate) : undefined,
    },
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchEntry = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/diary/${entryId}`,
            {
              headers: { Authorization: `Bearer ${session.backendToken}` },
            }
          );
          if (!res.ok) throw new Error("Failed to fetch diary entry.");
          const data = await res.json();

          form.reset({
            ...data,
            date: parseISO(data.date),
            artworkPhotos: data.artworkPhotos || [],
          });
          setExistingPhotos(data.artworkPhotos || []);
        } catch (error) {
          toast.error(error.message);
          router.back();
        } finally {
          setIsLoading(false);
        }
      };
      if (session) fetchEntry();
    } else {
      setIsLoading(false);
    }
  }, [entryId, isEditMode, session, router, form]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      form.setValue("artworkPhotos", updatedFiles);
    },
    [form, files]
  );

  const removeFile = (fileToRemove) => {
    URL.revokeObjectURL(fileToRemove.preview);
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    form.setValue("artworkPhotos", updatedFiles);
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const loadingToastId = toast.loading(
      isEditMode ? "Updating diary..." : "Uploading diary..."
    );

    const formData = new FormData();
    formData.append("date", data.date.toISOString());
    formData.append("category", data.category);
    formData.append("subject", data.subject || "");
    formData.append("description", data.description || "");
    formData.append("studioLife", data.studioLife || "");

    if (files.length > 0) {
      files.forEach((file) => formData.append("artworkPhotos", file));
    }

    const url = isEditMode
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/diary/${entryId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/diary`;

    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${session.backendToken}` },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      toast.success(isEditMode ? "Diary updated!" : "Diary created!", {
        id: loadingToastId,
      });
      router.push(`/user/${session.user.id}/daily-diary`);
      router.refresh();
    } catch (error) {
      toast.error(error.message, { id: loadingToastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 w-full max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {isEditMode ? "Edit Diary" : "New Diary"}
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
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
                  <DatePicker
                    date={field.value}
                    setDate={field.onChange}
                    fromDate={startOfToday()}
                  />
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
                    <SelectItem value="For Sale">For Sale</SelectItem>
                    <SelectItem value="Personal Work">Personal Work</SelectItem>
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
                <FormLabel>Artwork Photos</FormLabel>
                {isEditMode && existingPhotos.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Current photos (uploading new files will replace these):
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {existingPhotos.map((photo) => (
                        <div
                          key={photo.public_id}
                          className="relative w-24 h-24 rounded-lg overflow-hidden"
                        >
                          <Image
                            src={photo.url}
                            alt="Existing artwork"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div
                    {...useDropzone({ onDrop }).getRootProps()}
                    className="w-full md:w-1/2 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center text-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input {...useDropzone({ onDrop }).getInputProps()} />
                    <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm">
                      click or drag to upload photo
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
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      New photos to upload:
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="relative w-24 h-24 rounded-lg overflow-hidden"
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
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isEditMode ? "Update Diary" : "Upload Diary"}
          </Button>
        </form>
      </Form>
    </div>
  );
}