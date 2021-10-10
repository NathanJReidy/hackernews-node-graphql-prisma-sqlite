const feed = async (parent, args, context) => {
  return await context.prisma.link.findMany();
};

module.exports = {
  feed,
};
