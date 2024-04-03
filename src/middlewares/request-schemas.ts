import { z } from "zod"


const validUsernameSchema = z.string().min(3).max(100).refine(s=>!s.includes(" "))
const validPasswordSchema = z.string().min(8).max(30)
const validFullNameSchema = z.string().min(2).max(100).regex(/^[a-zA-Z ]+$/);
const validDescription = z.string().min(2).max(100)
export const CreateUserSchema = z.object({
    username:validUsernameSchema,
    password:validPasswordSchema,
    full_name:validFullNameSchema.optional()
})


export const LoginUserSchema = z.object({
    username:validUsernameSchema,
    password:validPasswordSchema
})

export const UpdateFullNameSchema = z.object({
    full_name : validFullNameSchema.nullable()
})

export const UpdateChecklistSchema= z.object({
    description:validDescription.nullable()
})