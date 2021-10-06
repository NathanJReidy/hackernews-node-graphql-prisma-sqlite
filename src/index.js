const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: () => links,
    link: (parent, args) => {
      const [link] = links.filter((obj) => obj.id === `link-${args.id}`);
      return link;
    },
  },

  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const linkIndexToUpdate = links.findIndex(
        (obj) => obj.id === `link-${args.id}`
      );

      const updatedLink = {
        id: `link-${args.id}`,
        description: args.description,
        url: args.url,
      };

      links[linkIndexToUpdate] = updatedLink;
      console.log(links);

      return updatedLink;
    },
    deleteLink: (parent, args) => {
      const linkIndexToDelete = links.findIndex(
        (obj) => obj.id === `link-${args.id}`
      );

      const deletedLinkSuccessfully = `You have successfully removed link-${args.id}`;

      links.splice(linkIndexToDelete, 1);

      return deletedLinkSuccessfully;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
