// import { CardContentData } from "./CardContentData"
// import fs from "fs"
// import { ImageBox } from "./ImageBox"

// // const fileContents = fs.readFileSync(
// //     `${__dirname}/ImageBoxTestImage.png`,
// //     {encoding: "base64url"}
// // )

// const incompleteImageBox1 = {
//     type: CardContentData.Type.IMAGE
// }

// // const incompleteImageBox2 = {
// //     base64ImageData: fileContents
// // }

// // const completeImageBox = {
// //     type: CardContentData.Type.IMAGE,
// //     base64ImageData: fileContents
// // }

// // describe("ImageBox.isImageBox() function", () => {
// //     test("isImageBox(undefined) returns false", () => {
// //         expect(ImageBox.isImageBox(undefined)).toBe(false)
// //     })

// //     test("isImageBox(3) returns false", () => {
// //         expect(ImageBox.isImageBox(3)).toBe(false)
// //     })

// //     test("isImageBox({}) returns false", () => {
// //         expect(ImageBox.isImageBox({})).toBe(false)
// //     })

// //     test("isImageBox(incompleteImageBox1) returns false", () => {
// //         expect(ImageBox.isImageBox(incompleteImageBox1)).toBe(false)
// //     })

// //     test("isImageBox(incompleteImageBox2) returns false", () => {
// //         expect(ImageBox.isImageBox(incompleteImageBox2)).toBe(false)
// //     })

// //     test("isImageBox(completeImageBox) returns true", () => {
// //         expect(ImageBox.isImageBox(completeImageBox)).toBe(true)
// //     })
// // })

// // describe("ImageBox.of() function", () => {
// //     test("ImageBox.of() given fileContents returns completeImageBox object", 
// //     () => {
// //         expect(ImageBox.of(fileContents)).toMatchObject(completeImageBox)
// //     })
// // })