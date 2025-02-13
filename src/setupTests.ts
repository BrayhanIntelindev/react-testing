import '@testing-library/jest-dom'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './mocks/servers'

beforeAll(() => {
    server.listen()
})

afterAll(() => {
    server.close()
})

afterEach(() => {
    server.resetHandlers()
})