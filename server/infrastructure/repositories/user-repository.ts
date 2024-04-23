import prisma from "../clients/prisma";

type UserParams = {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    image_url: string,
  };

export default async function createUser(params: UserParams) {
    await prisma.user.create({
        data: {
            id: params.id,
            first_name: params.first_name,
            last_name: params.last_name,
            email: params.email,
            image_url: params.image_url,
        },
      });
}