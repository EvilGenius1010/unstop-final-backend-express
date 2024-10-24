import { z } from "zod";


// export const updateLocationSchema = z.object({
export const latitudeSchema = z.string().min(-90).max(90)
export const longitudeSchema = z.string().min(-180).max(180)
export const phoneNumberSchema = z.string().length(10)

export const otpSchema = z.string().length(6)
