/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Upload, Loader2 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const businessTypes = [
  "Technology",
  "Food & Beverage",
  "Retail",
  "Healthcare",
  "Education",
  "Finance",
  "Real Estate",
  "Manufacturing",
  "Entertainment",
  "Other",
]

type FormValues = {
  fullName: string
  contactNumber: string
  email: string
  residentialAddress: string
  leoLionStatus: string
  businessName: string
  businessType: string
  businessDescription: string
  businessAddress: string
  facebookLink: string
  instagramLink: string
  otherSocialMediaLink: string
  yearsInOperation: number
  businessInspiration: string
  businessChallenge: string
  priorNetworks: string
  interestedInMentorship: boolean
  interestedInCollaboration: boolean
  expectations: string
  leoLionAssociation: string
  businessAlignment: string
  images: string[]
  coverImage: string | null
  myLeoLciNumber: string
  businessTagline: string
  leoImage: File | null
  entrepreneurPhoto: File | null
}

export function AddBusinessForm() {
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [entrepreneurPhoto, setEntrepreneurPhoto] = useState<File | null>(null)
  const [entrepreneurPhotoPreview, setEntrepreneurPhotoPreview] = useState<string | null>(null)

  const form = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      contactNumber: "",
      email: "",
      residentialAddress: "",
      leoLionStatus: "",
      businessName: "",
      businessType: "",
      businessDescription: "",
      businessAddress: "",
      facebookLink: "",
      instagramLink: "",
      otherSocialMediaLink: "",
      yearsInOperation: 0,
      businessInspiration: "",
      businessChallenge: "",
      priorNetworks: "",
      interestedInMentorship: false,
      interestedInCollaboration: false,
      expectations: "",
      leoLionAssociation: "",
      businessAlignment: "",
      images: [],
      coverImage: null,
      myLeoLciNumber: "",
      businessTagline: "",
      leoImage: null,
      entrepreneurPhoto: null,
    },
  })

  async function onSubmit(values: FormValues) {
    const isValid = await form.trigger()
    if (!isValid) {
      console.log("Form has validation errors:", form.formState.errors)
      alert("Please fix the validation errors before submitting.")
      return
    }

    setIsSubmitting(true)
    console.log("Submitting form:", values)
    try {
      // Upload images to S3
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const formData = new FormData()
          formData.append("file", image)
          const res = await fetch("/api/uploadToS3", { method: "POST", body: formData })
          const data = await res.json()
          return data.url
        }),
      )

      const coverImageUrl = coverImage
        ? (
            await (
              await fetch("/api/uploadToS3", {
                method: "POST",
                body: (() => {
                  const formData = new FormData()
                  formData.append("file", coverImage)
                  return formData
                })(),
              })
            ).json()
          ).url
        : null

      const entrepreneurPhotoUrl = entrepreneurPhoto
        ? (
            await (
              await fetch("/api/uploadToS3", {
                method: "POST",
                body: (() => {
                  const formData = new FormData()
                  formData.append("file", entrepreneurPhoto)
                  return formData
                })(),
              })
            ).json()
          ).url
        : null

      // Save form data to Google Sheets
      const response = await fetch("/api/saveToGoogleSheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          images: uploadedImages,
          coverImage: coverImageUrl,
          entrepreneurPhoto: entrepreneurPhotoUrl,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Form submission result:", result)

      alert("Business added successfully!")
      form.reset()
      setImages([])
      setPreviewUrls([])
      setCoverImage(null)
      setCoverImagePreview(null)
      setEntrepreneurPhoto(null)
      setEntrepreneurPhotoPreview(null)
      setCurrentStep(0)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Error submitting form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      setImages((prevImages) => [...prevImages, ...newImages])

      const newPreviewUrls = newImages.map((file) => URL.createObjectURL(file))
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls])
    }
  }

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0])
      setCoverImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index))
  }

  const removeCoverImage = () => {
    setCoverImage(null)
    setCoverImagePreview(null)
  }

  const handleEntrepreneurPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEntrepreneurPhoto(e.target.files[0])
      setEntrepreneurPhotoPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const removeEntrepreneurPhoto = () => {
    setEntrepreneurPhoto(null)
    setEntrepreneurPhotoPreview(null)
  }

  const steps = [
    { title: "Personal", fields: ["fullName", "contactNumber", "email", "residentialAddress", "leoLionStatus"] },
    {
      title: "Business",
      fields: [
        "businessName",
        "businessTagline",
        "businessType",
        "businessDescription",
        "businessAddress",
        "facebookLink",
        "instagramLink",
        "otherSocialMediaLink",
        "yearsInOperation",
      ],
    },
    { title: "Professional", fields: ["businessInspiration", "businessChallenge", "priorNetworks"] },
    { title: "Additional", fields: ["interestedInMentorship", "interestedInCollaboration", "expectations"] },
    { title: "Verification", fields: ["leoLionAssociation", "businessAlignment", "myLeoLciNumber"] },
  ]

  const nextStep = async () => {
    const isStepValid = await form.trigger(steps[currentStep].fields as any[]) // Wait for validation
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#8E2157] to-[#58142F] text-white p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold">LEON Entrepreneur Registration</CardTitle>
            <CardDescription className="text-gray-200 mt-2 text-sm md:text-base">
              Join the Leo Entrepreneurs and Opportunities Network! Share your business details with us to help us
              understand your needs better. Please ensure all fields are completed and your contact information is
              accurate. After submission, our team will reach out to verify your details, and your information will
              appear on the site within 2-3 business days.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <Tabs value={steps[currentStep].title.toLowerCase()} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6 md:mb-8 overflow-x-auto">
                {steps.map((step, index) => (
                  <TabsTrigger
                    key={step.title}
                    value={step.title.toLowerCase()}
                    disabled={index !== currentStep}
                    className={cn(
                      "data-[state=active]:bg-[#8E2157] data-[state=active]:text-white",
                      "transition-all duration-200 ease-in-out",
                      "text-xs md:text-sm py-2 px-1 md:px-2",
                    )}
                  >
                    {step.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {steps.map((step, index) => (
                <TabsContent key={step.title} value={step.title.toLowerCase()} className="space-y-4 md:space-y-6">
                  <h2 className="text-xl md:text-2xl font-bold text-[#8E2157] mb-4 md:mb-6">
                    {step.title} Information
                  </h2>
                  {step.fields.map((field) => (
                    <FormField
                      key={field}
                      control={form.control}
                      name={field as any}
                      render={({ field: fieldProps }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-base md:text-lg font-semibold">{getFieldLabel(field)}</FormLabel>
                          <FormControl>{renderFormControl(field, fieldProps)}</FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                  {index === 1 && (
                    <>
                      <div className="space-y-4 mt-6 md:mt-8">
                        <h3 className="text-lg md:text-xl font-semibold text-[#8E2157]">Business Images</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          These images will appear in the gallery section of your business page.
                        </p>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-48 md:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 md:w-10 md:h-10 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG or WebP (MAX. 5MB per image)</p>
                            </div>
                            <Input
                              id="dropzone-file"
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>
                        {previewUrls.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-4">
                            {previewUrls.map((url, index) => (
                              <div key={index} className="relative group">
                                <Image
                                  src={url || "/placeholder.svg"}
                                  alt={`Uploaded image ${index + 1}`}
                                  width={200}
                                  height={200}
                                  className="object-cover rounded-lg transition-opacity group-hover:opacity-75"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="space-y-4 mt-6 md:mt-8">
                        <h3 className="text-lg md:text-xl font-semibold text-[#8E2157]">Cover Image</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          This image will appear at the top of your business page and in search results.
                        </p>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="cover-image-upload"
                            className="flex flex-col items-center justify-center w-full h-48 md:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            {coverImagePreview ? (
                              <Image
                                src={coverImagePreview || "/placeholder.svg"}
                                alt="Cover Image Preview"
                                width={200}
                                height={200}
                                className="object-cover rounded-lg"
                              />
                            ) : (
                              <>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 md:w-10 md:h-10 mb-3 text-gray-400" />
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">PNG, JPG or WebP (MAX. 5MB per image)</p>
                                </div>
                              </>
                            )}
                            <Input
                              id="cover-image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleCoverImageUpload}
                            />
                          </label>
                          {coverImagePreview && (
                            <Button type="button" variant="destructive" size="icon" onClick={removeCoverImage}>
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="space-y-4 mt-6 md:mt-8">
                        <h3 className="text-lg md:text-xl font-semibold text-[#8E2157]">Photo of You</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          This photo will appear next to your name as the business owner.
                        </p>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="entrepreneur-photo-upload"
                            className="flex flex-col items-center justify-center w-full h-48 md:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            {entrepreneurPhotoPreview ? (
                              <Image
                                src={entrepreneurPhotoPreview || "/placeholder.svg"}
                                alt="Entrepreneur Photo Preview"
                                width={200}
                                height={200}
                                className="object-cover rounded-lg"
                              />
                            ) : (
                              <>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 md:w-10 md:h-10 mb-3 text-gray-400" />
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">PNG, JPG or WebP (MAX. 5MB)</p>
                                </div>
                              </>
                            )}
                            <Input
                              id="entrepreneur-photo-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleEntrepreneurPhotoUpload}
                            />
                          </label>
                          {entrepreneurPhotoPreview && (
                            <Button type="button" variant="destructive" size="icon" onClick={removeEntrepreneurPhoto}>
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between bg-gray-50 p-4 md:p-6 space-y-4 sm:space-y-0">
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              className="w-full sm:w-auto px-6"
            >
              Previous
            </Button>
            <Button
              type="button"
              onClick={currentStep < steps.length - 1 ? nextStep : form.handleSubmit(onSubmit)}
              className="w-full sm:w-auto bg-[#8E2157] hover:bg-[#58142F] px-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : currentStep < steps.length - 1 ? (
                "Next"
              ) : (
                "Submit"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

function getFieldLabel(field: string): string {
  const labels: { [key: string]: string } = {
    fullName: "Full Name",
    contactNumber: "Contact Number",
    email: "Email Address",
    residentialAddress: "Residential Address",
    leoLionStatus: "Are you a:",
    businessName: "Business Name",
    businessType: "Type of Business/Industry",
    businessDescription: "Brief Description of Your Business",
    businessAddress: "Business Address",
    facebookLink: "Facebook Page Link",
    instagramLink: "Instagram Profile Link",
    otherSocialMediaLink: "Other Social Media Link",
    yearsInOperation: "Years in Operation",
    businessInspiration: "What inspired you to start this business?",
    businessChallenge: "What is your current business challenge or goal?",
    priorNetworks: "Have you been part of any similar networks or entrepreneurial programs?",
    interestedInMentorship: "Are you interested in mentorship opportunities?",
    interestedInCollaboration: "Would you like to collaborate with other Leo/Lion entrepreneurs?",
    expectations: "Please share any specific expectations from the LEON platform.",
    leoLionAssociation:
      "How long have you been associated with the Leo/Lion movement, and what roles have you held within it?",
    businessAlignment:
      "How does your business align with the core values of leadership and service promoted by the Leo and Lion movement?",
    myLeoLciNumber: "MyLeo/MyLCI Number",
    businessTagline: "Business Tagline",
  }
  return labels[field] || field
}

function renderFormControl(field: string, fieldProps: any) {
  switch (field) {
    case "leoLionStatus":
      return (
        <RadioGroup
          onValueChange={fieldProps.onChange}
          defaultValue={fieldProps.value}
          className="flex flex-col space-y-1"
        >
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="Leo" />
            </FormControl>
            <FormLabel className="font-normal">Leo</FormLabel>
          </FormItem>
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="Lion" />
            </FormControl>
            <FormLabel className="font-normal">Lion</FormLabel>
          </FormItem>
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="Leo Lion" />
            </FormControl>
            <FormLabel className="font-normal">Leo Lion</FormLabel>
          </FormItem>
        </RadioGroup>
      )
    case "businessType":
      return (
        <Select onValueChange={fieldProps.onChange} defaultValue={fieldProps.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a business type" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {businessTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    case "businessDescription":
    case "businessInspiration":
    case "businessChallenge":
    case "expectations":
    case "leoLionAssociation":
    case "businessAlignment":
      return <Textarea className="min-h-[100px]" {...fieldProps} />
    case "interestedInMentorship":
    case "interestedInCollaboration":
      return (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={fieldProps.value} onCheckedChange={fieldProps.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              {field === "interestedInMentorship"
                ? "Yes, I'm interested in mentorship opportunities"
                : "Yes, I'd like to collaborate with other Leo/Lion entrepreneurs"}
            </FormLabel>
          </div>
        </FormItem>
      )
    case "yearsInOperation":
      return <Input type="number" {...fieldProps} />
    case "facebookLink":
    case "instagramLink":
    case "otherSocialMediaLink":
      return <Input type="url" placeholder="https://" {...fieldProps} />
    case "myLeoLciNumber":
      return <Input placeholder="Enter your MyLeo/MyLCI number" {...fieldProps} />
    case "businessTagline":
      return <Input placeholder="Enter your business tagline" {...fieldProps} />
    default:
      return <Input {...fieldProps} />
  }
}

