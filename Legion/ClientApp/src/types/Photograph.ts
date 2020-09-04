export default interface Photograph {
  id: string
  title: string
  description: string
  dateTimeOriginal: Date | undefined
  dateTimeDigitized: Date | undefined
  exposureTime: string
  fNumber: string
  exposureProgram: string
  isoSpeed: string
  keywords: string[]
  fileId: string
  isPublished: boolean
  publishedDate: Date | undefined
  uploadedDate: Date | undefined
  width: number
  height: number
  ratio: number
}
