"use server"

import { sendApprovalEmail } from "@/lib/email-service"

interface ApprovalData {
  registrationId: string
  employeeEmail: string
  employeeName: string
  conferenceName: string
  comments?: string
}

export async function approveRegistration(prevState: any, formData: FormData) {
  try {
    const approvalData: ApprovalData = {
      registrationId: formData.get("registrationId") as string,
      employeeEmail: formData.get("employeeEmail") as string,
      employeeName: formData.get("employeeName") as string,
      conferenceName: formData.get("conferenceName") as string,
      comments: formData.get("comments") as string,
    }

    // Validate required fields
    if (!approvalData.registrationId || !approvalData.employeeEmail) {
      return {
        success: false,
        error: true,
        message: "Missing required information for approval.",
      }
    }

    // Update registration status in database (simulated)
    await updateRegistrationStatus(approvalData.registrationId, "approved", approvalData.comments)

    // Send approval email to employee
    const emailResult = await sendApprovalEmail({
      type: "approval",
      to: approvalData.employeeEmail,
      employeeName: approvalData.employeeName,
      conferenceName: approvalData.conferenceName,
      registrationId: approvalData.registrationId,
      comments: approvalData.comments,
    })

    if (!emailResult.success) {
      return {
        success: false,
        error: true,
        message: "Registration approved but email notification failed. Please contact the employee directly.",
      }
    }

    // Send notification to admin/HR for processing
    await sendAdminNotification({
      type: "approved_registration",
      registrationId: approvalData.registrationId,
      employeeName: approvalData.employeeName,
      conferenceName: approvalData.conferenceName,
    })

    return {
      success: true,
      error: false,
      message: `Registration ${approvalData.registrationId} has been approved. Employee has been notified via email.`,
    }
  } catch (error) {
    console.error("Approval error:", error)
    return {
      success: false,
      error: true,
      message: "An unexpected error occurred during approval. Please try again.",
    }
  }
}

export async function rejectRegistration(prevState: any, formData: FormData) {
  try {
    const rejectionData: ApprovalData = {
      registrationId: formData.get("registrationId") as string,
      employeeEmail: formData.get("employeeEmail") as string,
      employeeName: formData.get("employeeName") as string,
      conferenceName: formData.get("conferenceName") as string,
      comments: formData.get("comments") as string,
    }

    // Validate required fields
    if (!rejectionData.registrationId || !rejectionData.employeeEmail) {
      return {
        success: false,
        error: true,
        message: "Missing required information for rejection.",
      }
    }

    // Update registration status in database (simulated)
    await updateRegistrationStatus(rejectionData.registrationId, "rejected", rejectionData.comments)

    // Send rejection email to employee
    const emailResult = await sendApprovalEmail({
      type: "rejection",
      to: rejectionData.employeeEmail,
      employeeName: rejectionData.employeeName,
      conferenceName: rejectionData.conferenceName,
      registrationId: rejectionData.registrationId,
      comments: rejectionData.comments,
    })

    if (!emailResult.success) {
      return {
        success: false,
        error: true,
        message: "Registration rejected but email notification failed. Please contact the employee directly.",
      }
    }

    return {
      success: true,
      error: false,
      message: `Registration ${rejectionData.registrationId} has been rejected. Employee has been notified via email.`,
    }
  } catch (error) {
    console.error("Rejection error:", error)
    return {
      success: false,
      error: true,
      message: "An unexpected error occurred during rejection. Please try again.",
    }
  }
}

async function updateRegistrationStatus(registrationId: string, status: string, comments?: string) {
  // Simulate database update
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log(`Registration ${registrationId} status updated to: ${status}`)
  if (comments) {
    console.log(`Supervisor comments: ${comments}`)
  }
}

async function sendAdminNotification(data: {
  type: string
  registrationId: string
  employeeName: string
  conferenceName: string
}) {
  // Send notification to admin/HR for further processing
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log("Admin notification sent:", data)
}
