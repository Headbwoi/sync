import Link from "next/link"

export const metadata = {
  title: "Signup - Sync",
  description: "An app that helps you to manage your tasks quickly",
}

function SignUpPage() {
  return (
    <section>
      <div>Sign Up Page</div>

      <Link href={"/login"}>Login</Link>
    </section>
  )
}

export default SignUpPage
