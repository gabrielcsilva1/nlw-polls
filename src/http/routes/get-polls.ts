import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma';

import { z } from 'zod';

export async function getPoll(app: FastifyInstance) {
    app.get('/polls/:pollId', async (request, reply) =>{
        // Tipagem do route param
        const getPollParams = z.object({
            pollId: z.string().uuid()
        })

        // Validação
        const { pollId } = getPollParams.parse(request.params);

        // Busca no Banco de Dados
        const poll = await prisma.poll.findUnique({
            where: {
                id: pollId
            },
            include: {
                options: {
                    select: {
                        id: true,
                        title: true,
                        pollId: false
                    }
                }
            }
        })

        return reply.send({ poll });
    })
}