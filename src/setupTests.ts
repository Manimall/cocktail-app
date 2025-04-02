import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, afterAll } from 'vitest'
import { server } from './mocks/server'


beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
  if (typeof AbortController === 'undefined') {
    global.AbortController = require('abort-controller').AbortController
  }
})

afterEach(() => {
  cleanup()
  server.resetHandlers()
})

afterAll(() => server.close())
