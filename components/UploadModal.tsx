"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const form = useForm<FieldValues>({
    defaultValues: {
      author: "",
      album: "",
      genre: "",
      duration: 0,
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      form.reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // todo: upload to supabase
    try {
      setIsLoading(true);
      const imageFile = values?.image?.[0];
      const songFile = values?.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("missing fields");
        return;
      }

      const id = uniqid();
      // upload song
      const songUpload = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values?.title}-${id}`, songFile, { cacheControl: "3600", upsert: false });

      if (songFile.error) {
        setIsLoading(false);
        return toast.error("Failed to upload song");
      }

      // upload image
      const imageUpload = await supabaseClient.storage
        .from("images")
        .upload(`image-${values?.title}-${id}`, imageFile, { cacheControl: "3600", upsert: false });

      if (imageFile.error) {
        setIsLoading(false);
        toast.error("Failed to upload image");
      }

      const addSongRecord = await supabaseClient.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        genre: values.genre,
        duration: values.duration,
        album: values.album,
        image_path: imageUpload.data?.path,
        song_path: songUpload.data?.path,
      });

      if (addSongRecord.error) {
        setIsLoading(false);
        return toast.error(addSongRecord.error.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song uploaded successfully");
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title="Add a song" isOpen={uploadModal.isOpen} onChange={onChange} description="Upload an mp3 file">
      <form className="flex flex-col gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Input
          id="title"
          disabled={isLoading}
          {...form.register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...form.register("author", { required: true })}
          placeholder="Song Author"
        />
        <Input id="album" disabled={isLoading} {...form.register("album", { required: false })} placeholder="Album" />
        <Input id="genre" disabled={isLoading} {...form.register("genre", { required: false })} placeholder="Genre" />
        <Input
          id="duration"
          disabled={isLoading}
          {...form.register("duration", { required: false })}
          type="number"
          placeholder="Duration"
        />
        <div>
          <div className="pb-1 ml-1 text-sm">mp3 File</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...form.register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1 ml-1 text-sm">Image/Album Art</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...form.register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
