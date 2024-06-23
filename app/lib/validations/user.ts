import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Minimo 3 caracteres." })
    .max(30, { message: "Maximo 30 caracteres." }),
  username: z
    .string()
    .min(3, { message: "Minimo 3 caracteres." })
    .max(30, { message: "Maximo 30 caracteres." }),
  bio: z
    .string()
    .min(3, { message: "Minimo 3 caracteres." })
    .max(1000, { message: "Maximo 1000 caracteres." }),
});
