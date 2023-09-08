import { ProfileForm } from "@/entities/User"
import { withLayout } from "@/widget/Layout"
import styles from "./Profile.module.css"
import { ProfileSubscribtionInfo } from "./ProfileSubscribtionInfo/ProfileSubscribtionInfo"

function Profile() {
  return (
    <div className={styles.page}>
      <ProfileForm className={styles.form} />
      <ProfileSubscribtionInfo className={styles.subscribtion} />
    </div>
  )
}

export default withLayout(Profile)
