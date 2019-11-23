export class FileUpload {
  key: string
  name: string
  progress = 0
  success = false
  error?: string

  constructor(public file: File) {
    this.key = file.name
    this.name = file.name
  }
}
