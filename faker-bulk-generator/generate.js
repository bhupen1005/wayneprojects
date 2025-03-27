import { faker } from "@faker-js/faker";
import fs from "fs";

const generateDummyData = (count = 2) => {
  const data = [];

  for (let i = 0; i < count; i++) {
    const secretKey = `whsec_${faker.string.alphanumeric(32)}`;
    data.push({
      _id: { $oid: faker.database.mongodbObjectId() },
      user: { $oid: faker.database.mongodbObjectId() },
      img: "/postImg.jpeg",
      title: faker.lorem.words(3),
      slug: secretKey,
      desc: secretKey,
      category: faker.helpers.arrayElement([
        "general",
        "tech",
        "lifestyle",
        "education",
      ]),
      content: `<p><span style="background-color: rgb(248, 249, 253); color: rgb(26, 32, 44);">${secretKey}</span></p>`,
      isFeatured: faker.datatype.boolean(),
      visit: faker.number.int({ min: 0, max: 100 }),
      createdAt: { $date: faker.date.past().toISOString() },
      updatedAt: { $date: faker.date.recent().toISOString() },
      __v: 0,
    });
  }

  return data;
};

const dummyData = generateDummyData(200); // Change 20 to the number you want
fs.writeFileSync("dummyData.json", JSON.stringify(dummyData, null, 2));

console.log("✅ Dummy data generated successfully!");
