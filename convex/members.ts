import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// List all members and include their full storage URLs
export const list = query({
  args: {},
  handler: async (ctx) => {
    const members = await ctx.db.query("members").collect();
    return Promise.all(
      members.map(async (member) => ({
        ...member,
        avatar: (member.storageId 
          ? await ctx.storage.getUrl(member.storageId) 
          : member.avatarUrl) ?? `https://i.pravatar.cc/150?u=${member._id}`,
      }))
    );
  },
});

// Create or update a member
export const save = mutation({
  args: {
    id: v.optional(v.id("members")),
    name: v.string(),
    role: v.string(),
    email: v.string(),
    phone: v.string(),
    parrain: v.optional(v.string()),
    joined_date: v.string(),
    status: v.string(),
    gender: v.string(),
    level: v.string(),
    avatarUrl: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    if (id) {
      await ctx.db.patch(id, data);
      return id;
    } else {
      return await ctx.db.insert("members", data);
    }
  },
});

// Delete a member and their profile picture if not a default one
export const remove = mutation({
  args: { id: v.id("members") },
  handler: async (ctx, args) => {
    const member = await ctx.db.get(args.id);
    if (member?.storageId) {
      await ctx.storage.delete(member.storageId);
    }
    await ctx.db.delete(args.id);
  },
});

// Generate a URL for secure image uploads
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
