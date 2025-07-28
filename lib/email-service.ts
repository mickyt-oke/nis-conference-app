interface EmailData {
  to: string
  subject: string
  type:
    | "attendee_confirmation"
    | "speaker_confirmation"
    | "team_confirmation"
    | "supervisor_notification"
    | "approval_notification"
    | "rejection_notification"
  data: any
}

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

interface ApprovalEmailData {
  type: "approval" | "rejection"
  to: string
  employeeName: string
  conferenceName: string
  registrationId: string
  comments?: string
}

export async function sendRegistrationEmail(registrationData: RegistrationData, registrationId: string) {
  try {
    const emailData = buildEmailData(registrationData, registrationId)

    // Simulate email sending (in production, use services like Resend, SendGrid, etc.)
    await simulateEmailSend(emailData)

    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error }
  }
}

export async function sendApprovalEmail(approvalData: ApprovalEmailData) {
  try {
    const emailData = buildApprovalEmailData(approvalData)
    await simulateEmailSend(emailData)
    return { success: true }
  } catch (error) {
    console.error("Approval email sending failed:", error)
    return { success: false, error }
  }
}

function buildApprovalEmailData(approvalData: ApprovalEmailData): EmailData {
  const { type, to, employeeName, conferenceName, registrationId, comments } = approvalData

  if (type === "approval") {
    return {
      to,
      subject: `Conference Registration Approved - ${conferenceName}`,
      type: "approval_notification",
      data: {
        employeeName,
        conferenceName,
        registrationId,
        comments,
        nextSteps: [
          "Your registration has been approved by your supervisor",
          "Payment instructions will be sent separately",
          "Conference materials will be available 1 week before the event",
          "Contact HR for any travel arrangements if required",
        ],
      },
    }
  } else {
    return {
      to,
      subject: `Conference Registration Not Approved - ${conferenceName}`,
      type: "rejection_notification",
      data: {
        employeeName,
        conferenceName,
        registrationId,
        comments,
        nextSteps: [
          "Your registration request was not approved at this time",
          "Please review the supervisor comments below",
          "You may discuss alternative options with your supervisor",
          "Consider applying for future conferences that align better with department priorities",
        ],
      },
    }
  }
}

function buildEmailData(registrationData: RegistrationData, registrationId: string): EmailData {
  const { registrationType, firstName, lastName, email, conference } = registrationData

  const conferenceName = getConferenceName(conference)

  switch (registrationType) {
    case "attendee":
      return {
        to: email,
        subject: `Conference Registration Confirmed - ${conferenceName}`,
        type: "attendee_confirmation",
        data: {
          name: `${firstName} ${lastName}`,
          registrationId,
          conference: conferenceName,
          email,
          phone: registrationData.phone,
          organization: registrationData.organization,
          dietary: registrationData.dietary,
          nextSteps: [
            "Payment instructions will be sent separately",
            "Conference materials will be available 1 week before the event",
            "Check your email for updates and announcements",
          ],
        },
      }

    case "speaker":
      return {
        to: email,
        subject: `Speaker Application Received - ${conferenceName}`,
        type: "speaker_confirmation",
        data: {
          name: `${firstName} ${lastName}`,
          registrationId,
          conference: conferenceName,
          presentationTitle: registrationData.presentationTitle,
          organization: registrationData.organization,
          nextSteps: [
            "Your application is under review",
            "You will be notified within 5-7 business days",
            "If accepted, you will receive speaker guidelines and technical requirements",
          ],
        },
      }

    case "team":
      return {
        to: email,
        subject: `Team Registration Submitted for Approval - ${conferenceName}`,
        type: "team_confirmation",
        data: {
          name: `${firstName} ${lastName}`,
          registrationId,
          conference: conferenceName,
          staffId: registrationData.staffId,
          department: registrationData.department,
          supervisorName: registrationData.supervisorName,
          supervisorEmail: registrationData.supervisorEmail,
          nextSteps: [
            "Your supervisor has been notified for approval",
            "You will receive confirmation once approved",
            "Contact your supervisor if you need to expedite the process",
          ],
        },
      }

    default:
      throw new Error("Invalid registration type")
  }
}

function getConferenceName(conferenceId: string): string {
  const conferences: Record<string, string> = {
    "strategic-2024": "Annual Strategic Planning Conference 2024",
    "border-security-2024": "Border Security Summit 2024",
    "digital-workshop-2024": "Digital Transformation Workshop",
  }

  return conferences[conferenceId] || "NIS Conference"
}

async function simulateEmailSend(emailData: EmailData) {
  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Log email content (in production, this would be sent via email service)
  console.log("📧 Email Sent:", {
    to: emailData.to,
    subject: emailData.subject,
    type: emailData.type,
    timestamp: new Date().toISOString(),
  })

  // Generate email content based on type
  const emailContent = generateEmailContent(emailData)
  console.log("Email Content:", emailContent)

  return { success: true, messageId: `msg_${Date.now()}` }
}

function generateEmailContent(emailData: EmailData): string {
  const { type, data } = emailData

  switch (type) {
    case "attendee_confirmation":
      return `
Dear ${data.name},

Thank you for registering for ${data.conference}!

Registration Details:
- Registration ID: ${data.registrationId}
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}
- Organization: ${data.organization || "Not specified"}
- Dietary Requirements: ${data.dietary || "None specified"}

Next Steps:
${data.nextSteps.map((step: string) => `• ${step}`).join("\n")}

If you have any questions, please contact us at conference@immigration.gov.ng

Best regards,
NIS Conference Team
      `

    case "speaker_confirmation":
      return `
Dear ${data.name},

Thank you for your speaker application for ${data.conference}!

Application Details:
- Registration ID: ${data.registrationId}
- Name: ${data.name}
- Organization: ${data.organization}
- Presentation Title: ${data.presentationTitle}

Next Steps:
${data.nextSteps.map((step: string) => `• ${step}`).join("\n")}

We appreciate your interest in sharing your expertise with the NIS community.

Best regards,
NIS Conference Team
      `

    case "team_confirmation":
      return `
Dear ${data.name},

Your conference registration has been submitted for supervisor approval.

Registration Details:
- Registration ID: ${data.registrationId}
- Staff ID: ${data.staffId}
- Department: ${data.department}
- Conference: ${data.conference}
- Supervisor: ${data.supervisorName} (${data.supervisorEmail})

Next Steps:
${data.nextSteps.map((step: string) => `• ${step}`).join("\n")}

Thank you for your commitment to professional development.

Best regards,
NIS Conference Team
      `

    case "supervisor_notification":
      return `
Dear Supervisor,

A team member has requested approval to attend a conference:

Employee Details:
- Name: ${data.employeeName}
- Email: ${data.employeeEmail}
- Staff ID: ${data.staffId}
- Department: ${data.department}

Conference: ${data.conference}
Registration ID: ${data.registrationId}

Justification:
${data.justification}

Please review and approve/decline this request through the admin portal.

Best regards,
NIS Conference Team
      `

    case "approval_notification":
      return `
Dear ${data.employeeName},

Great news! Your conference registration has been approved.

Conference: ${data.conferenceName}
Registration ID: ${data.registrationId}

${data.comments ? `Supervisor Comments:\n${data.comments}\n` : ""}

Next Steps:
${data.nextSteps.map((step: string) => `• ${step}`).join("\n")}

Congratulations on your approved registration!

Best regards,
NIS Conference Team
      `

    case "rejection_notification":
      return `
Dear ${data.employeeName},

We regret to inform you that your conference registration request was not approved at this time.

Conference: ${data.conferenceName}
Registration ID: ${data.registrationId}

${data.comments ? `Supervisor Comments:\n${data.comments}\n` : ""}

Next Steps:
${data.nextSteps.map((step: string) => `• ${step}`).join("\n")}

Thank you for your understanding.

Best regards,
NIS Conference Team
      `

    default:
      return "Conference registration notification"
  }
}
