import { describe, expect, test } from 'vitest'

import process from 'process'
import { parseInput } from './input.js'
import fs from 'fs'

describe('parseInput function testing', () => {
  test('File correctly passed to parseInput function', () => {
    const inputFile = parseInput('./sample_files/Silver Blaze.txt')
    expect(inputFile.files).toStrictEqual(['./sample_files/Silver Blaze.txt'])
  })

  test('Directory correctly passed to parseInput function', () => {
    let dir = 'sample_files'
    const inputDir = parseInput(dir)
    let filesArray = []

    fs.readdirSync(dir).forEach((file) => {
      filesArray.push(file)
    })
    expect(inputDir.currentDir).toBe(process.cwd() + `/${dir}`)
    expect(inputDir.files).toEqual(expect.arrayContaining(filesArray))
  })

  test('Input file does not exist', () => {
    let fileName = 'WrongName.txt'
    expect(() => {
      parseInput(fileName)
    }).toThrowError(`ENOENT: no such file or directory, stat '${fileName}'`)
  })

  test('Input folder does not exist', () => {
    let folderName = 'WrongName'

    expect(() => {
      parseInput(folderName)
    }).toThrowError(`ENOENT: no such file or directory, stat '${folderName}'`)
  })

  test('Input argument not passed to parseInput function', () => {
    expect(() => {
      parseInput()
    }).toThrow()
  })
})
