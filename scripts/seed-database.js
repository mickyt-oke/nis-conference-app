// Node.js script to seed the database with test data
import bcrypt from "bcryptjs"

// Test user data with hashed passwords
const testUsers = [
  {
    username: "admin",
    email: "admin@immigration.gov.ng",
    password: "admin123", // Will be hashed
    role: "admin",
    name: "System Administrator",
    department: "IT Department",
  },
  {
    username: "supervisor",
    email: "supervisor@immigration.gov.ng",
    password: "super123", // Will be hashed
    role: "supervisor",
    name: "Department Supervisor",
    department: "Operations",
  },
  {
    username: "user",
    email: "user@immigration.gov.ng",
    password: "user123", // Will be hashed
    role: "user",
    name: "Regular User",
    department: "General",
  },
  {
    username: "speaker1",
    email: "speaker1@immigration.gov.ng",
    password: "speak123", // Will be hashed
    role: "speaker",
    name: "Dr. John Doe",
    department: "Policy Research",
  },
  {
    username: "attendee1",
    email: "attendee1@immigration.gov.ng",
    password: "attend123", // Will be hashed
    role: "attendee",
    name: "Jane Smith",
    department: "Border Control",
  },
]

async function hashPasswords() {
  console.log("Generating password hashes for test users...\n")

  for (const user of testUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    console.log(`User: ${user.username}`)
    console.log(`Password: ${user.password}`)
    console.log(`Hash: ${hashedPassword}`)
    console.log(`Role: ${user.role}`)
    console.log("---")
  }

  console.log("\nSQL INSERT statements:")
  console.log("INSERT INTO users (username, email, password_hash, role, name, department, status) VALUES")

  const values = []
  for (const user of testUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    values.push(
      `('${user.username}', '${user.email}', '${hashedPassword}', '${user.role}', '${user.name}', '${user.department}', 'active')`,
    )
  }

  console.log(values.join(",\n") + ";")
}

// Run the script
hashPasswords().catch(console.error)

// Export for use in other files
export { testUsers }
