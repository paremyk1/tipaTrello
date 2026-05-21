import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main(){
  const w = await prisma.workspace.create({data:{name:'Default Workspace'}});
  const b = await prisma.board.create({data:{title:'Product Roadmap',workspaceId:w.id,background:'#0c66e4'}});
  const todo = await prisma.list.create({data:{title:'To Do',order:0,boardId:b.id}});
  await prisma.list.create({data:{title:'Doing',order:1,boardId:b.id}});
  await prisma.card.create({data:{title:'Build desktop app shell',order:0,listId:todo.id}});
}
main().finally(()=>prisma.$disconnect());
