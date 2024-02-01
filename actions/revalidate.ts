"use server";
import { revalidatePath } from "next/cache";

export const revalidatePathByServerAction = async (path: string) => {
    try {
        if (path) revalidatePath(path);
    } catch (error) {
        console.error("revalidatePathByServerAction=> ", error)
    }
};

export const revalidateTagByServerAction = async (tag: string) => {
    try {
        if (tag) revalidatePath(tag);
    } catch (error) {
        console.error("revalidateTagByServerAction=> ", error)
    }
};
