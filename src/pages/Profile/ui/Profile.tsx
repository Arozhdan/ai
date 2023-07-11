import { ProfileForm } from "@/entities/User"
import { withLayout } from "@/widget/Layout"

function Profile() {
  return <ProfileForm />
}

export default withLayout(Profile)
