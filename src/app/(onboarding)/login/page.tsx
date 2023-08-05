import Link from "next/link"

export const metadata = {
  title: "Login - Sync",
  description: "An app that helps you to manage your tasks quickly",
}

function LoginPage() {
  return (
    <div>
      <div>Login Page</div>

      <Link href={"/signup"}>SignUp</Link>
    </div>
  )
}

export default LoginPage
