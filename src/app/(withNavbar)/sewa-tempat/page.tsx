import FacilityCard from '@/components/facilities/facilityCard';
import React from 'react'

const facility = {
    id: "1",
    name: "Mama's Kitchen",
    description:
      "Berlokasi di Pulo Asem. Dapur ini berukuran 8x10m2. Disewakan oleh Mama’s Bakery dan dilengkapi peralatan baking super lengkap yang dapat dipakai dalam waktu peminjaman.",
    location: "Jakarta Timur",
    price_per_day: 250000,
    owner: "Zoha Alatas",
    rating: 4.9,
  };

export default function Page() {
    const facilities = Array.from({ length: 18 }, (_, index) => ({
        ...facility,
        id: index.toString(),
      }));

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex-grow p-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 2xl:grid-cols-4 gap-4">
          {facilities.map((facility) => (
            <FacilityCard key={facility.id} {...facility} />
          ))}
        </div>
      </div>
    </div>
  )
}