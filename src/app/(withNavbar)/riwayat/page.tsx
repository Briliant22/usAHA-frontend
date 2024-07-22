import BookingCard from "@/components/facilities/bookingCard";
import Link from "next/link";

interface FacilityImage {
  uuid: string;
  facility: string;
  image: string;
  is_primary: boolean;
}

interface FacilityBooking {
  uuid: string;
  facility: string;
  booker: string;
  start_date: string;
  end_date: string;
  duration: number;
  notes: string;
  is_approved: boolean;
  is_paid: boolean;
  user_rating: number | null;
  facility_name: string;
  city: string;
  price_per_day: number;
  image: FacilityImage;
}

const getBooking = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: FacilityBooking[] = await response.json();
  return data;
};

export default async function Page() {
  const bookings = await getBooking(
    "http://localhost:8000/facilities/bookings/",
  );

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-[40px] font-semibold">
          Riwayat Transaksi
        </h1>
      </div>
      <div className="flex w-[70vw] flex-wrap items-center justify-center space-y-4">
        {bookings.map((booking) => (
          <BookingCard {...booking} />
        ))}
      </div>
    </div>
  );
}
