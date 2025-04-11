import { faker } from "@faker-js/faker";
export type Details = {
  aa: number;
  bb: number;
  cc: number;
  dd: "relationship" | "complicated" | "single";
};
export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Details[]; // optional for nested data
};
export function makeDataWithSubRows(): Person[] {
  return [
    {
      firstName: "John",
      lastName: "Doe",
      age: 30,
      visits: 100,
      progress: 50,
      status: "relationship",
      subRows: [
        {
          aa: 28,
          bb: 80,
          cc: 60,
          dd: "complicated",
        },
        {
          aa: 28,
          bb: 80,
          cc: 60,
          dd: "complicated",
        },
      ],
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      age: 35,
      visits: 200,
      progress: 80,
      status: "single",
      subRows: [
        {
          aa: 22,
          bb: 30,
          cc: 90,
          dd: "relationship",
        },
        {
          aa: 29,
          bb: 70,
          cc: 40,
          dd: "complicated",
        },
        {
          aa: 29,
          bb: 70,
          cc: 40,
          dd: "complicated",
        },
        {
          aa: 29,
          bb: 70,
          cc: 40,
          dd: "complicated",
        },
        {
          aa: 29,
          bb: 70,
          cc: 40,
          dd: "complicated",
        },
      ],
    },
  ];
}
