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

export async function submitRegistration(prevState: any, formData: FormData) {
  try {
    // Extract form data
    const registrationData: RegistrationData = {
      registrationType: formData.get("registrationType") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      organization: formData.get("organization") as string,
      jobTitle: formData.get("jobTitle") as string,
      conference: formData.get("conference") as string,
    }

    // Add type-specific data
    if (registrationData.registrationType === "speaker") {
      registrationData.biography = formData.get("biography") as string
      registrationData.presentationTitle = formData.get("presentationTitle") as string
      registrationData.presentationAbstract = formData.get("presentationAbstract") as string
      registrationData.expertise = formData.get("expertise") as string
      registrationData.experience = formData.get("experience") as string
    }

    if (registrationData.registrationType === "team") {
      registrationData.staffId = formData.get("staffId") as string
      registrationData.department = formData.get("department") as string
      registrationData.gradeLevel = formData.get("gradeLevel") as string
      registrationData.supervisorName = formData.get("supervisorName") as string
      registrationData.supervisorEmail = formData.get("supervisorEmail") as string
      registrationData.justification = formData.get("justification") as string
    }

    if (registrationData.registrationType === "attendee") {
      registrationData.dietary = formData.get("dietary") as string
    }

    // Validate required fields
    if (!registrationData.firstName || !registrationData.lastName || !registrationData.email) {
      return {
        success: false,
        error: true,
        message: "Please fill in all required fields.",
      }
    }

    // Generate registration ID
    const registrationId = `NIS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Save registration to database (simulated)
    await saveRegistration({ ...registrationData, registrationId })

    // Send confirmation email
    const emailResult = await sendRegistrationEmail(registrationData, registrationId)

    if (!emailResult.success) {
      return {
        success: false,
        error: true,
        message: "Registration saved but email confirmation failed. Please contact support.",
      }
    }

    // Send supervisor notification for team members
    if (registrationData.registrationType === "team" && registrationData.supervisorEmail) {
      await sendSupervisorNotification(registrationData, registrationId)
    }

    return {
      success: true,
      error: false,
      message: `Registration successful! Confirmation email sent to ${registrationData.email}. Registration ID: ${registrationId}`,
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      error: true,
      message: "An unexpected error occurred. Please try again or contact support.",
    }
  }
}

async function saveRegistration(data: RegistrationData & { registrationId: string }) {
  // Simulate database save
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log("Registration saved:", data.registrationId)
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
