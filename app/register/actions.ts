"use server"

import { sendRegistrationEmail } from "@/lib/email-service"

interface RegistrationData {
  registrationType: string
  firstName: string
  lastName: string
  email: string
  phone: string
  organization?: string
  jobTitle?: string
  conference: string
  [key: string]: any
}

interface ValidationError {
  [key: string]: string[]
}

export async function submitRegistration(prevState: any, formData: FormData) {
  try {
    // Extract form data
    const registrationData: RegistrationData = {
      registrationType: formData.get("registrationType") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      organization: formData.get("organization") as string || "",
      jobTitle: formData.get("jobTitle") as string || "",
      conference: formData.get("conference") as string,
    }

    // Add type-specific data
    if (registrationData.registrationType === "speaker") {
      registrationData.biography = formData.get("biography") as string
      registrationData.presentationTitle = formData.get("presentationTitle") as string
      registrationData.presentationAbstract = formData.get("presentationAbstract") as string
      registrationData.expertise = formData.get("expertise") as string || ""
      registrationData.experience = formData.get("experience") as string || ""
    }

    if (registrationData.registrationType === "team") {
      registrationData.staffId = formData.get("staffId") as string
      registrationData.department = formData.get("department") as string
      registrationData.gradeLevel = formData.get("gradeLevel") as string || ""
      registrationData.supervisorName = formData.get("supervisorName") as string
      registrationData.supervisorEmail = formData.get("supervisorEmail") as string
      registrationData.justification = formData.get("justification") as string
    }

    if (registrationData.registrationType === "attendee") {
      registrationData.dietary = formData.get("dietary") as string || ""
    }

    // Submit to Laravel API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
    const response = await fetch(`${apiUrl}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(registrationData),
    })

    const data = await response.json()

    // Handle validation errors
    if (!response.ok) {
      if (response.status === 422 && data.errors) {
        const errors = data.errors as ValidationError
        const errorMessages = Object.values(errors)
          .flat()
          .join(", ")
        return {
          success: false,
          message: errorMessages || "Validation failed. Please check your input.",
          errors: data.errors,
        }
      }
      return {
        success: false,
        message: data.message || "Registration failed. Please try again.",
      }
    }

    // Send confirmation email
    const emailResult = await sendRegistrationEmail(registrationData, data.registrationId)

    if (!emailResult.success) {
      return {
        success: false,
        message: "Registration saved but email confirmation failed. Please contact support.",
      }
    }

    // Send supervisor notification for team members
    if (registrationData.registrationType === "team" && registrationData.supervisorEmail) {
      await sendSupervisorNotification(registrationData, data.registrationId)
    }

    return {
      success: true,
      message: `Registration successful! Confirmation email sent to ${registrationData.email}. Registration ID: ${data.registrationId}`,
      registrationId: data.registrationId,
    }
  } catch (error) {
    console.error("Registration error:", error)
    let message = "An unexpected error occurred. Please try again or contact support."
    if (error && typeof error === "object" && "message" in error) {
      message = (error as any).message
    }
    return {
      success: false,
      message,
    }
  }
}

async function sendSupervisorNotification(data: RegistrationData, registrationId: string) {
  // Send notification to supervisor for team member registrations
  const supervisorEmailData = {
    to: data.supervisorEmail!,
    subject: `Conference Registration Approval Required - ${data.firstName} ${data.lastName}`,
    type: "supervisor_notification" as const,
    data: {
      employeeName: `${data.firstName} ${data.lastName}`,
      employeeEmail: data.email,
      staffId: data.staffId,
      department: data.department,
      conference: data.conference,
      justification: data.justification,
      registrationId,
    },
  }

  // Simulate sending supervisor notification
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log("Supervisor notification sent:", supervisorEmailData.to)
}
