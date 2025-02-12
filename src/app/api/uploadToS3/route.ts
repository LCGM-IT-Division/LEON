import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from "uuid"
import sharp from "sharp" // Import sharp for image manipulation

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 })

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Resize the image using sharp (resize to 1200px width while maintaining aspect ratio)
    const resizedBuffer = await sharp(buffer)
      .resize(1200)  // Set the max width to 1200px (change as needed)
      .toBuffer()

    const fileName = `${uuidv4()}-${file.name}`

    // Upload the resized image to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: resizedBuffer,  // Use the resized buffer here
        ContentType: file.type,
      })
    )

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
    return NextResponse.json({ success: true, url: fileUrl })
  } catch (error) {
    const errorMessage = (error as Error).message
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
