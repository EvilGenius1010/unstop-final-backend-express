import axios from "axios"

export default async function ConvertAddrType(location: string) {
  const encodedLocation = encodeURIComponent(location);
  let addrconversion = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${process.env.GCP_MAPS_API}`)
  return addrconversion
}
