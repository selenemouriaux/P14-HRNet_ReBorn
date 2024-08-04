import { z } from "zod"

export const SivTabledataSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  dateOfBirth: z.string(),
  street: z.string().min(2, { message: "Street is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z
    .string()
    .min(2, { message: "State is required, please select from the list" }),
  zipCode: z
    .number()
    .min(4, { message: "Zip code is required and must be a number" }),
  startDate: z.string(),
  department: z
    .string()
    .min(2, { message: "Department is required, please select from the list" }),
})

export type sivTableData = z.infer<typeof SivTabledataSchema>
