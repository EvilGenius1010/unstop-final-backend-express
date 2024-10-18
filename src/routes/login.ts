import prisma from "../utils/prisma";
export default async function Login(phone_no: string, name: string) {
  //   const checkUserExists = await prisma.user.findUnique({
  //     where: {
  //       phone_no: phone_no,
  //       name: name
  //     }
  //   })
  //   if (checkUserExists == null) {
  //     const pushUsertoDB = await prisma.user.create(phone_no)
  //   }

  const checkUserExists = await prisma.user.findUnique({
    where: {
      phone_no: phone_no,
      name: name
    }
  })
  if (checkUserExists == null) {
    const pushUsertoDB = await prisma.user.create({

      data: {

        phone_no: phone_no,
        name: name
      }
    })
  }


  return checkUserExists

}
