import Link from "next/link"

export const metadata = {
  title: "Signup - Sync",
  description: "An app that helps you to manage your tasks quickly",
}

function SignUpPage() {
  return (
    <div>
      <div>Sign Up Page</div>

      <Link href={"/login"}>Login</Link>
    </div>
  )
}

export default SignUpPage
