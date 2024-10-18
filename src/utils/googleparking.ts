import { constants } from "vm"

const axios = require('axios')

async function getParkingSpots(location: string, radius: string) {
  const apiKey = process.env.GCP_MAPS_API
  const PARKINGSPOTSAPI = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=${location}&radius=${radius}&type=parking`

}
