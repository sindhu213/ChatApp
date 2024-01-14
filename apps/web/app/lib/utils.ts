import prisma from "app/lib/prismadb";

export async function getUser(userEmail ?: string) {
    if(userEmail === undefined){
        console.error("User-email is undefined.");
        return null;
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
        });
        return user;
    } catch (error) {
        console.log("Failed to fetch data: ", error);
        throw new Error("Failed to fetch data.");
    } finally {
        await prisma.$disconnect();
    }
}
