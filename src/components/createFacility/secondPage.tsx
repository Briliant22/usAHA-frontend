import { useState } from "react";
import TextButton from "../textButton";
import GoBack from "./goBack";
import Image from "next/image";

interface SecondPageProps {
  setFirstPage: () => void;
  setThirdPage: () => void;
  setDescription: (description: string) => void;
  description: string;
  setImages: (images: (File | null)[]) => void;
  images: (File | null)[];
}

const imageIcon = "/icons/miscIcons/image.svg";

export default function SecondPage({
  setFirstPage,
  setThirdPage,
  setDescription,
  description,
  setImages,
  images,
}: SecondPageProps) {
  const [deskripsi, setDeskripsi] = useState<string>(description);
  const [imageFiles, setImageFiles] = useState<(File | null)[]>(images);
  const [previewUrls, setPreviewUrls] = useState<(string | null)[]>(
    images.map((file) => (file ? URL.createObjectURL(file) : null)),
  );

  const handleImageChange = (index: number, file: File | null) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = file;
    setImageFiles(newImageFiles);

    const newPreviewUrls = [...previewUrls];
    newPreviewUrls[index] = file ? URL.createObjectURL(file) : null;
    setPreviewUrls(newPreviewUrls);
  };

  const handleNextPage = () => {
    setDescription(deskripsi);
    setImages(imageFiles);
    setThirdPage();
  };

  const handlePrevPage = () => {
    setDescription(deskripsi);
    setImages(imageFiles);
    setFirstPage();
  };

  return (
    <div className="mb-10 flex w-full flex-col pb-10">
      <GoBack onClick={handlePrevPage} />
      <div className="absolute right-10 top-12">
        <TextButton
          label="Lanjut"
          size="small"
          type="secondary"
          onClick={handleNextPage}
        />
      </div>
      <div className="my-8 flex flex-col items-center space-y-4">
        <h2 className="text-[20px] font-semibold">
          Berikan deskripsi singkat atas properti Anda
        </h2>
        <div className="flex w-1/2 flex-col items-center"></div>
        <div className="h-[15vw] w-[45vw] gap-2 rounded-[24px] border border-[#979DBD]">
          <textarea
            className="h-full w-full rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#1973F9]"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Tulis deskripsi..."
            required
          />
        </div>
      </div>
      <div className="my-8 flex flex-col items-center space-y-4">
        <h2 className="text-[20px] font-semibold">
          Lengkapi foto properti Anda
        </h2>
        <div className="flex w-[45vw] flex-col items-center justify-center space-y-4">
          <div className="relative h-[25vw] w-[45vw] items-center justify-center">
            <div
              className="absolute inset-0 flex items-center justify-center rounded-[24px] border border-dashed border-[#979DBD]"
              style={{
                backgroundImage: previewUrls[0]
                  ? `url(${previewUrls[0]})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!previewUrls[0] && (
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={imageIcon}
                    alt="image input"
                    width={34}
                    height={34}
                    className=""
                  />
                  <p className="block text-base font-medium">
                    Upload foto thumbnail
                  </p>
                </div>
              )}
            </div>
            <input
              type="file"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              onChange={(e) =>
                handleImageChange(0, e.target.files ? e.target.files[0] : null)
              }
              accept="image/*"
              required
            />
          </div>
          <div className="flex w-full flex-wrap items-center justify-between">
            {previewUrls.slice(1).map((previewUrl, index) => (
              <div
                key={index + 1}
                className="relative flex h-[14vw] w-[22vw] items-center justify-center"
              >
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-[24px] border border-dashed border-[#979DBD]"
                  style={{
                    backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!previewUrl && (
                    <div className="flex flex-col items-center justify-center">
                      <Image
                        src={imageIcon}
                        alt="image input"
                        width={34}
                        height={34}
                        className=""
                      />
                      <p className="block text-base font-medium">
                        Upload foto fasilitas
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  className="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center opacity-0"
                  onChange={(e) =>
                    handleImageChange(
                      index + 1,
                      e.target.files ? e.target.files[0] : null,
                    )
                  }
                  accept="image/*"
                  required
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
