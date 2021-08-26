import '@testing-library/jest-dom/extend-expect'

// Mock all calls to Logger.log()
import { Logger } from '../utils/logger'
jest.spyOn(Logger.prototype, 'log').mockImplementation(jest.fn())
