import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
     //    await prisma.user.createMany({
     //          data: [
     //             {
     //                  name: 'Dao Van Luong'
     //             },
     //             {
     //                  name: 'Nguyen Trong Phong'
     //             },
     //             {
     //                  name: 'Dao Van Quan'
     //             },
     //          ]
     //    })

     // await prisma.user.deleteMany()

     //   const users = await prisma.user.findMany({  
     //        select: { id: true, name: true }
     //   })

     //   console.log({users})

     //    await prisma.post.create({ 
     //        data: {
     //           title: 'This is post 1',
     //           body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
     //           authorId: '07beab1e-5345-4ab3-9bb4-8130fd8f35b0',
     //           comments: {
     //                 createMany: {
     //                      data: [
     //                           {
     //                               message: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC',
     //                               userId: '07beab1e-5345-4ab3-9bb4-8130fd8f35b0'
     //                           }
     //                      ]
     //                 }
     //           }
     //        },
     //    })

     //    await prisma.post.create({ 
     //        data: {
     //           title: 'This is post2',
     //           body: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
     //           authorId: '53ea115f-86da-45ae-b7cc-ff55fb83cd06',
     //           comments: {
     //                 createMany: {
     //                      data: [
     //                           {
     //                               message: 'This book is a treatise on the theory of ethics, very popular during the Renaissance',
     //                               userId: '53ea115f-86da-45ae-b7cc-ff55fb83cd06'
     //                           }
     //                      ]
     //                 }
     //           }
     //        },
     //    })

     //    await prisma.post.createMany({ data: [
     //          {
     //             title: 'This is post 3',
     //             body: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
     //             authorId: 'ee7cb0b6-82c1-4b6e-b015-970f824fec50'
     //          },
     //    ] })

     // await prisma.comment.createMany({
     //       data: [
     //          {
     //            message: `But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born`,
     //            postId: 'a63082a5-3719-4ef3-91fb-d008eb0479c5',
     //            userId: '07beab1e-5345-4ab3-9bb4-8130fd8f35b0',
     //            parentId: '540d7bcd-1c61-49e1-ab85-7062051775cf'
     //          },
     //          {
     //            message: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos do`,
     //            postId: 'a63082a5-3719-4ef3-91fb-d008eb0479c5',
     //            userId: 'ee7cb0b6-82c1-4b6e-b015-970f824fec50',
     //            parentId: '540d7bcd-1c61-49e1-ab85-7062051775cf'
     //          },
     //       ]
     // })

//      await prisma.comment.delete({  where: {
//            id: 'da3a0c10-2762-4a60-87b9-fd2a9323eb3b'
//      } })
}


main().then(() => {
     console.log('Seed success')
}).catch((error) => {
      console.log(error)
})