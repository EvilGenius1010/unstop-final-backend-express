import axios from "axios"

export default async function ConvertAddrType(location: string) {
  let addrconversion = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GCP_MAPS_API}`)
  return addrconversion
}
