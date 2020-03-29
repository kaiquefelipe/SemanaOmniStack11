const request = require('supertest');
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONGs', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => await connection.destroy())

    it('Criação de um nova ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "KFCM",
            email: "kaique@email.com",
            whatsapp: "85988888888",
            city: "Forteleza",
            uf: "CE"
        })

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})