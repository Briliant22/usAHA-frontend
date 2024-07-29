export default function parseAddress(address: string) {
  if (!address) {
    return {
      namaJalan: "",
      nomor: "",
      kelurahan: "",
      kecamatan: "",
      kota: "",
      provinsi: "",
      kodePos: "",
    };
  }

  const components = address.split(",").map((component) => component.trim());

  const [
    namaJalan = "",
    nomor = "",
    kelurahan = "",
    kecamatan = "",
    kota = "",
    provinsi = "",
    kodePos = "",
  ] = components;
  return { namaJalan, nomor, kelurahan, kecamatan, kota, provinsi, kodePos };
}
