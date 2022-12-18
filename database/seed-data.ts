interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: "pending" | "in-progress" | "finished";
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "pending: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, porro.",
      createdAt: Date.now(),
      status: "pending",
    },
    {
      description:
        "in-progress: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, aperiam?",
      createdAt: Date.now() - 1000000,
      status: "in-progress",
    },
    {
      description:
        "finished: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, sed?",
      createdAt: Date.now() - 100000,
      status: "finished",
    },
  ],
};
