import prisma from "../clients/prisma";

type UserParams = {
    first_name: string|null,
    last_name: string|null,
    email: string,
    image_url: string,
    id: string | undefined
  };

export async function createUser(params: UserParams) {
    await prisma.user.create({
        data: {
            id: (params.id)? params.id: "",
            first_name: (params.first_name)? params.first_name: "",
            last_name: (params.last_name)?params.last_name: "",
            email: params.email,
            image_url: params.image_url,
        },
      });
}