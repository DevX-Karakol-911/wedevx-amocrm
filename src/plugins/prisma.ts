import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";

const prisma = async (app: FastifyInstance) => {
	const prisma = new PrismaClient();

	await prisma.$connect();

	app.decorate("prisma", prisma);

	app.addHook("onClose", async (app) => {
		await app.prisma.$disconnect();
	});
};

export default fp(prisma);
