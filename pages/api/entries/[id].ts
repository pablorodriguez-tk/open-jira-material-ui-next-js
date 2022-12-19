import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Entry, IEntry } from "../../../models";
import { db } from "../../../database";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El ID no es valido " + id });
  }
  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);
    default:
      return res.status(400).json({ message: "Metodo no existe" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToUpdate = await Entry.findById(id);
  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "No se encontro el ID " + id });
  }
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  const updatedEntry = await Entry.findByIdAndUpdate(
    id,
    {
      description,
      status,
    },
    { runValidators: true, new: true }
  );
  await db.disconnect();
  res.status(200).json(updatedEntry!);
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryInDB = await Entry.findById(id);
  await db.disconnect();
  if (!entryInDB) {
    return res
      .status(400)
      .json({ message: "No se encontro entrada con el ID " + id });
  }

  res.status(200).json(entryInDB);
};
