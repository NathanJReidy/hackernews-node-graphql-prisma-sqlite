const postedBy = async (parent, args, context) => {
  return await context.prisma.link
    .findUnique({ where: { id: parent.id } })
    .postedBy();
};

const votes = (parent, args, context) => {
  return context.prisma.link.findUnique({ where: { id: parent.id } }).votes();
};

module.exports = {
  postedBy,
  votes,
};
