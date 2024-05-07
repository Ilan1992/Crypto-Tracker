import { createPost } from "../model/postsAdapter.js";
import { createUser, getUserByEmail } from "../model/usersAdapter.js";
import generateUniqueNumber from "../utils/generateUniqueNumber.js";
import debug from "debug";
const log = debug("app:initialData");

const initialUsers = async () => {
  let users = [
    {
      name: {
        first: "albert",
        last: "mc",
      },
      phone: "0500000000",
      email: "albert@gmail.com",
      password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      image: {
        alt: "http://www.google.com",
      },
      address: {
        country: "miami",
        city: "asd",
      },
      isBusiness: false,
      isAdmin: false,
    },
    {
      name: {
        first: "jon",
        last: "lennon",
      },
      phone: "0500000000",
      email: "johnn@gmail.com",
      password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      image: {
        alt: "http://www.google.com",
      },
      address: {
        country: "asd",
        city: "asd",
      },
      isBusiness: true,
      isAdmin: true,
    },
    {
      name: {
        first: "json",
        last: "staten",
      },
      phone: "0500000000",
      email: "jamees@gmail.com",
      password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      image: {
        alt: "http://www.google.com",
      },
      address: {
        country: "israel",
        city: "asd",
      },
      isBusiness: true,
      isAdmin: false,
    },
  ];
  try {
    let bizId = "";
    let checkEmail = await getUserByEmail(users[0].email);
    if (checkEmail && checkEmail.email === users[0].email) return;
    for (let user of users) {
      let userFromDb = await createUser(user);
      if (!user.isAdmin && user.isBusiness) {
        bizId = userFromDb._id;
      }
    }
    return bizId;
  } catch (err) {
    log(err);
    return "";
  }
};

const initialPosts = async (bizId) => {
  let posts = [
    {
      title: "Bitcoin",
      subtitle:
        "Bitcoin and Altcoins Face Correction Risk as Rate Cut Expectations Decline",
      description:
        "Bitcoin and the broader cryptocurrency market are facing a potential “crucial tipping point,” according to Markus Thielen of 10x Research. His bearish outlook stems from persistent inflation, decreased expectations of interest rate cuts, and surging bond yields. This shift in economic sentiment has triggered a sell-off in both cryptocurrencies and tech stocks.",
      image: {
        url: "https://academy-public.coinmarketcap.com/srd-optimized-uploads/d22bca596ed5463c89b91024e6b415ff.jpeg",
        alt: "Bitcoin",
      },
      bizNumber: await generateUniqueNumber(),
      user_id: bizId,
      creatorName: "albert",
    },
    {
      title: "Ethereum",
      subtitle:
        "Vitalik Buterin Weighs-In On Default Transaction Privacy on Ethereum",
      description:
        "The ongoing discourse surrounding default transaction privacy on Ethereum has sparked significant interest and debate within the cryptocurrency community. At its core, the discussion centers on whether Ethereum, as a foundational layer of blockchain technology, should inherently provide transaction privacy. Recently, Vitalik Buterin, co-founder of Ethereum, offered his insights into this contentious issue.The question raised is pivotal “Should a base layer like Ethereum offer transaction privacy as a default feature?” This query encapsulates broader concerns about the balance between privacy, transparency, and stability within blockchain networks. By delving into Buterins perspective, we can gain valuable insights into the complexities of this debate.",
      image: {
        url: "https://coingape.com/wp-content/uploads/2024/01/Screenshot-2024-01-26-at-12.38.2.png",
        alt: "Ethereum",
      },
      bizNumber: await generateUniqueNumber(),
      user_id: bizId,
      creatorName: "json",
    },
    {
      title: "Solana",
      subtitle: "Solana Rolls Out Update To Fix Network Issues ",
      description:
        "Solana has released a crucial update to tackle the ongoing congestion on the Solana Network. Version 1.17.31 is the first in a series of planned updates.Solana has been plagued by congestion issues in recent months, caused by an unending meme coin frenzy that has led to a huge spike in user activity and bumped up network demand. ",
      image: {
        url: "https://cryptodaily.blob.core.windows.net/space/photo_2024-04-16%2012.02.30.jpeg",
        alt: "Solana",
      },
      bizNumber: await generateUniqueNumber(),
      user_id: bizId,
      creatorName: "albert",
    },
  ];
  try {
    for (let post of posts) {
      await createPost(post);
    }
  } catch (err) {
    log(err);
  }
};

export { initialUsers, initialPosts };
