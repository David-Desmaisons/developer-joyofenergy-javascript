import { Request } from "express";

export type RequestMeterId = Request<{ smartMeterId: string }>;
