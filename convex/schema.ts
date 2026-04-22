import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  members: defineTable({
    name: v.string(),
    role: v.string(),
    email: v.string(),
    phone: v.string(),
    parrain: v.optional(v.string()),
    joined_date: v.string(),
    status: v.string(),
    gender: v.string(), // "Male" | "Female"
    level: v.string(),  // "Junior" | "Senior"
    avatarUrl: v.optional(v.string()), 
    storageId: v.optional(v.id("_storage")),
  }),
});
