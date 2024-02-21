import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

export async function voteOnPoll(app: FastifyInstance) {
    app.post('/polls/:pollId/votes', async (request, reply) =>{
        // Tipagem do body
        const voteOnPollBody = z.object({
            pollOptionId: z.string().uuid()
        })

        const voteOnPollParams = z.object({
            pollId: z.string().uuid()
        })

        // Validação
        const { pollId } = voteOnPollParams.parse(request.params);
        const { pollOptionId } = voteOnPollBody.parse(request.body);

        
        let { sessionId } = request.cookies

        if (sessionId){
            // Verifica se o usuário já votou
            const userPreviousVoteOnPoll = await prisma.vote.findUnique({
                where: {
                    sessionId_pollId: {
                        sessionId,
                        pollId
                    }
                }
            })

            if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !== pollOptionId){
                // Apagar o voto anterior
                await prisma.vote.delete({
                    where: {
                        id: userPreviousVoteOnPoll.id
                    }
                })
            }
            else if (userPreviousVoteOnPoll){
                return reply.status(400).send({message: "You already voted on this poll."})
            }
        }
        else{
            // Criando Uma sessão única para o usuário
            sessionId =randomUUID();

            reply.setCookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30, // 30 dias
                signed: true,
                httpOnly: true
            });
        }
        

        // Armazena o voto no banco de dados
        await prisma.vote.create({
            data: {
                sessionId,
                pollId,
                pollOptionId
            }
        })

        return reply.status(201).send();
    })
}