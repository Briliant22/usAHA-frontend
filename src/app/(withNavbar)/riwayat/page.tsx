"use client";

import { useUser } from "@/components/isomorphic/userContext";
import BookingCard from "@/components/facilities/bookingCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loadingPage";

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

export default function Page() {
  const { isLoggedIn, fetchWithCredentials } = useUser();
  const [bookings, setBookings] = useState<FacilityBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (isLoggedIn()) {
        try {
          const response = await fetchWithCredentials(
            "http://localhost:8000/facilities/bookings/user/",
          );
          if (response.ok) {
            const data: FacilityBooking[] = await response.json();
            setBookings(data);
          } else {
            throw new Error("Gagal mengambil booking anda");
          }
        } catch (err) {
          setError("Gagal mengambil booking anda. Coba lagi di lain waktu.");
          console.error(err);
        }
      } else {
        setError("Anda harus login terlebih dahulu.");
      }
      setLoading(false);
    };

    fetchBookings();
  }, [isLoggedIn, fetchWithCredentials]);

  if (loading) return <LoadingPage />;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <div className="flex flex-col items-center justify-center py-4">
        <h1 className="text-center text-[40px] font-semibold">
          Riwayat Transaksi
        </h1>
      </div>
      <div className="flex w-[70vw] flex-wrap items-center justify-center space-y-4">
        {bookings.map((booking) => {
          const redirectLink = booking.is_paid
            ? `/riwayat/${booking.uuid}`
            : `/sewa-tempat/bayar/${booking.uuid}`;
          return (
            <Link href={redirectLink} key={booking.uuid} className="w-full">
              <BookingCard {...booking} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
