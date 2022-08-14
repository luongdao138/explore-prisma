import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // Insert user
  //   await prisma.user.createMany({
  //     data: [
  //       {
  //         name: 'luongdao',
  //         avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  //       },
  //       {
  //         name: 'phongnguyen',
  //         avatar:
  //           'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=f05c14dd4db49f08a789e6449604c490',
  //       },
  //       {
  //         name: 'quandao',
  //         avatar:
  //           'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=046c29138c1335ef8edee7daf521ba50',
  //       },
  //     ],
  //   });
  const users = await prisma.user.findMany();
  console.log({ users });

  //    Insert post
  //   await prisma.post.create({
  //     data: {
  //       body: `[Jeff Passan] Fernando Tatis Jr. will be suspended for 80 games, for violating MLB PED policy, MLB announced. The suspension will cover the remainder of this season and will render him ineligible for the postseason. It will continue into the beginning of next year.`,
  //       title: 'Fernando Tatis Jr. will be suspended for 80 games',
  //       authorId: '6cb7c2fa-fb14-43d9-993b-28978f44b422',
  //       comments: {
  //         createMany: {
  //           data: [
  //             {
  //               message: `This is big, this type of thing can change a young man's career`,
  //               userId: '891b50c0-52bb-4bba-b871-1cb39f7654c7',
  //             },
  //             {
  //               message: `He's claiming it was in a medication he took to cure ringworm. Like he couldn't go to CVS and take Lotrimin like everyone else?`,
  //               userId: '6a44e392-ea80-40a6-9334-5dedb9f79e3f',
  //             },
  //           ],
  //         },
  //       },
  //     },
  //   });

  //    Insert comments
  //   await prisma.comment.createMany({
  //     data: [
  //       {
  //         message: 'He is signed for another 12 YEARS',
  //         postId: 'b40e17cd-5535-464b-8850-d6b3388d963c',
  //         userId: '6cb7c2fa-fb14-43d9-993b-28978f44b422',
  //         parentId: 'daeaa212-4316-491a-b5ae-38bb2e3ba8e6',
  //       },
  //       {
  //         message: 'Now THIS is Padresing!',
  //         postId: 'b40e17cd-5535-464b-8850-d6b3388d963c',
  //         userId: '6a44e392-ea80-40a6-9334-5dedb9f79e3f',
  //         parentId: 'daeaa212-4316-491a-b5ae-38bb2e3ba8e6',
  //       },
  //     ],
  //   });

  //   await prisma.comment.update({
  //     where: {
  //       id: 'aa38ab34-9e59-4482-a012-4110aa0543dc',
  //     },
  //     data: {
  //       message: `don't they have clauses for this?`,
  //     },
  //   });
  //   await prisma.comment.update({
  //     where: {
  //       id: '85360a14-8f67-4749-b5ab-0d3b4f7da189',
  //     },
  //     data: {
  //       message: `Dude, the Browns gave a quarter-billion dollar contract to a known sexual predator, who just admitted it today`,
  //     },
  //   });
};

main()
  .then(() => {
    console.log('Seed success');
  })
  .catch((error) => {
    console.log(error);
  });
