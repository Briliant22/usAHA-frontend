import { useState } from "react";
import TextButton from "../textButton";
import GoBack from "../createFacility/goBack";
import Image from "next/image";
import { useUser } from "../isomorphic/userContext";

interface FacilityImage {
  uuid: string;
  facility: string;
  image: string;
  is_primary: boolean;
}

interface SecondPageProps {
  setFirstPage: () => void;
  setThirdPage: () => void;
  uuid: string;
  setImages: (images: (File | null)[]) => void;
  images: (File | null)[];
  previousImages: FacilityImage[];
}

export default function SecondPage({
  setFirstPage,
  setThirdPage,
  uuid,
  setImages,
  images,
  previousImages,
}: SecondPageProps) {
  const { fetchWithCredentials } = useUser();
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

    if (file) {
      handleSubmitImage(uuid, previousImages[index]?.uuid, file, index === 0);
    }
  };

  const handleNextPage = () => {
    setImages(imageFiles);
    setThirdPage();
  };

  const handlePrevPage = () => {
    setImages(imageFiles);
    setFirstPage();
  };

  const handleSubmitImage = async (
    facility: string,
    replace: string,
    image: File,
    isPrimary: boolean,
  ) => {
    const formData = new FormData();
    formData.append("facility", facility);
    formData.append("replace", replace);
    formData.append("image", image);
    formData.append("is_primary", JSON.stringify(isPrimary));

    try {
      const response = await fetchWithCredentials(
        `${process.env.NEXT_PUBLIC_API_URL}/facilities/image/create/`,
        {
          method: "POST",
          body: formData,
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.href = window.location.href;
    } catch (error) {
      console.error("Error changing facility image:", error);
    }
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
        <h2 className="text-[20px] font-semibold">Edit foto properti Anda</h2>
        <div className="flex w-[45vw] flex-col items-center justify-center space-y-4">
          <div className="relative h-[25vw] w-[45vw] items-center justify-center">
            <div
              className="absolute inset-0 flex items-center justify-center rounded-[24px] border border-[#979DBD]"
              style={{
                backgroundImage: previewUrls[0]
                  ? `url(${previewUrls[0]})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!previewUrls[0] && (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <Image
                    src={previousImages[0].image}
                    alt="image input"
                    className="h-full w-full rounded-[24px] object-cover"
                    layout="fill"
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
                  className="absolute inset-0 flex items-center justify-center rounded-[24px] border border-[#979DBD]"
                  style={{
                    backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!previewUrl && (
                    <div className="flex h-full w-full flex-col items-center justify-center">
                      <Image
                        src={previousImages[index + 1].image}
                        alt="image input"
                        className="h-full w-full rounded-[24px] object-cover"
                        layout="fill"
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
