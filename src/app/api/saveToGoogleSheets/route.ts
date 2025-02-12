import { NextResponse } from "next/server"
import { google } from "googleapis"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Log the received data for debugging
    console.log("Received data:", body)

    // Validate the required environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      throw new Error("Missing required environment variables")
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })

    // Prepare the values to be inserted
    const values = [
      body.fullName,
      body.email,
      body.contactNumber,
      body.residentialAddress,
      body.leoLionStatus,
      body.businessName,
      body.businessType,
      body.businessDescription,
      body.businessAddress,
      body.facebookLink,
      body.instagramLink,
      body.otherSocialMediaLink,
      body.yearsInOperation,
      body.businessInspiration,
      body.businessChallenge,
      body.priorNetworks,
      body.interestedInMentorship ? "Yes" : "No",
      body.interestedInCollaboration ? "Yes" : "No",
      body.expectations,
      body.leoLionAssociation,
      body.businessAlignment,
      body.myLeoLciNumber,
      body.images ? body.images.join(", ") : "",
      body.coverImage || "",
    ]

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [values] },
    })

    console.log("Data appended successfully:", response.data)

    return NextResponse.json({ success: true, message: "Data saved successfully" })
  } catch (error) {
    console.error("Error in saveToGoogleSheets:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 },
    )
  }
}

