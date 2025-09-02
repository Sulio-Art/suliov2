"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import imageCompression from "browser-image-compression";
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
import {
  useGetDiaryEntryByIdQuery,
  useCreateDiaryEntryMutation,
  useUpdateDiaryEntryMutation,
} from "../../../redux/Diary/diaryApi";
import { useSelector } from "react-redux";
import { selectBackendToken } from "@/redux/auth/authSlice";

const diaryFormSchema = z.object({
  date: z.date({ required_error: "A date is required." }),
  category: z.string().min(1, "Please select a category."),
  subject: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  artworkPhotos: z.array(z.any()).refine((files) => files.length > 0, {
    message: "Please upload at least one photo.",
  }),
  studioLife: z.string().max(500).optional(),
});

export default function NewDiaryForm() {
  const [files, setFiles] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [photosCleared, setPhotosCleared] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const token = useSelector(selectBackendToken);

  const entryId = params.entryId;
  const isEditMode = !!entryId;
  const preselectedDate = searchParams.get("date");

  const { data: entryData, isLoading: isFetchingEntry } =
    useGetDiaryEntryByIdQuery(entryId, {
      skip: !isEditMode || !token,
    });

  const [createDiaryEntry, { isLoading: isCreating }] =
    useCreateDiaryEntryMutation();
  const [updateDiaryEntry, { isLoading: isUpdating }] =
    useUpdateDiaryEntryMutation();
  const isSubmitting = isCreating || isUpdating;

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

  const storageKey = isEditMode
    ? `diary-form-draft-${entryId}`
    : "diary-form-draft-new";
  const watchedValues = form.watch();
  const isMounted = useRef(false);

  const toastShownRef = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      if (
        watchedValues.category ||
        watchedValues.subject ||
        watchedValues.description ||
        watchedValues.studioLife
      ) {
        localStorage.setItem(storageKey, JSON.stringify(watchedValues));
      }
    }
  }, [watchedValues, storageKey]);

  useEffect(() => {
    if (!toastShownRef.current) {
      const savedDraft = localStorage.getItem(storageKey);
      if (savedDraft) {
        const draftData = JSON.parse(savedDraft);
        toast(
          (t) => (
            <div className="flex flex-col gap-2">
              <span>You have an unsaved draft. Restore it?</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    form.reset({
                      ...draftData,
                      date: draftData.date
                        ? new Date(draftData.date)
                        : undefined,
                    });
                    toast.dismiss(t.id);
                    toast.success("Draft restored!");
                  }}
                >
                  Restore
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    localStorage.removeItem(storageKey);
                    toast.dismiss(t.id);
                  }}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          ),
          { duration: 10000 }
        );
        toastShownRef.current = true;
      }
    }
    isMounted.current = true;
  }, [storageKey, form]);

  useEffect(() => {
    if (isEditMode && entryData) {
      const photos = entryData.artworkPhotos || [];
      form.reset({
        ...entryData,
        date: parseISO(entryData.date),
        artworkPhotos: photos,
      });
      setExistingPhotos(photos);
    }
  }, [entryData, isEditMode, form]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const compressionToastId = toast.loading("Compressing images...");
      const compressionOptions = {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFiles = await Promise.all(
          acceptedFiles.map(async (file) => {
            const compressedFile = await imageCompression(
              file,
              compressionOptions
            );
            return Object.assign(compressedFile, {
              preview: URL.createObjectURL(compressedFile),
              name: file.name,
            });
          })
        );
        const updatedFiles = [...files, ...compressedFiles];
        setFiles(updatedFiles);
        setPhotosCleared(false);
        form.setValue("artworkPhotos", [...existingPhotos, ...updatedFiles], {
          shouldValidate: true,
        });
        toast.success("Images ready for upload!", { id: compressionToastId });
      } catch (error) {
        toast.error("Failed to compress images.", { id: compressionToastId });
        console.error(error);
      }
    },
    [form, files, existingPhotos]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
  });

  const removeFile = (fileToRemove) => {
    URL.revokeObjectURL(fileToRemove.preview);
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    form.setValue("artworkPhotos", [...existingPhotos, ...updatedFiles], {
      shouldValidate: true,
    });
  };

  const handleRemoveAllPhotos = () => {
    toast.success("Photos marked for removal. Save the form to confirm.");
    setExistingPhotos([]);
    setFiles([]);
    setPhotosCleared(true);
    form.setValue("artworkPhotos", [], { shouldValidate: true });
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const onSubmit = async (data) => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const loadingToastId = toast.loading(
      isEditMode ? "Updating diary..." : "Uploading diary..."
    );

    const formData = new FormData();
    formData.append("date", data.date.toISOString());
    formData.append("category", data.category);
    formData.append("subject", data.subject || "");
    formData.append("description", data.description || "");
    formData.append("studioLife", data.studioLife || "");

    if (isEditMode && photosCleared) {
      formData.append("photosCleared", "true");
    }

    if (files.length > 0 && !photosCleared) {
      files.forEach((file) => formData.append("artworkPhotos", file));
    }

    try {
      if (isEditMode) {
        await updateDiaryEntry({ id: entryId, formData }).unwrap();
      } else {
        await createDiaryEntry(formData).unwrap();
      }

      localStorage.removeItem(storageKey);
      toast.success(isEditMode ? "Diary updated!" : "Diary created!", {
        id: loadingToastId,
      });
      router.push(`/user/${session.user.id}/daily-diary`);
      router.refresh();
    } catch (error) {
      toast.error(error.data?.message || "An error occurred.", {
        id: loadingToastId,
      });
    }
  };

  if (isFetchingEntry) {
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
                    placeholder="e.g., 'Sunset Over the Lake'"
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
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-600">Current photos:</p>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleRemoveAllPhotos}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove All
                      </Button>
                    </div>
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
                    {...getRootProps()}
                    className="w-full md:w-1/2 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center text-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input {...getInputProps()} />
                    <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm">
                      Click or drag to upload photo
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