/**
 * @description 导入JSON文件
 * @returns JSON数据
 */
export const importJson = async (): Promise<string> => {
  try {
    const fileHandles = await (window as any).showOpenFilePicker({
      types: [{
        description: 'JSON files',
        accept: {
          'application/json': ['.json'],
        },
      }],
    })
    const fileHandle = fileHandles[0]
    const file = await fileHandle.getFile()
    const data = await file.text()
    if (data) {
      return data
    } else {
      throw new Error('File is empty')
    }
  } catch (error) {
    console.error(error)
    throw new Error('Import json failed')
  }
}