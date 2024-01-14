"use server";
import prisma from "app/lib/prismadb";

export async function registerUser(formdata: FormData) {
    const credentials = {
        email: formdata.get("email"),
        password: formdata.get("password"),
    };

    try {
        const user = await prisma.user.create({
            data: {
                email: credentials.email as string,
                hashedPassword: credentials.password as string,
            },
        });
		return user;
    } catch (error) {
        console.error("Failed to register user: ", error);
        throw new Error("Failed to register user");
    } finally {
        await prisma.$disconnect();
    }
}
