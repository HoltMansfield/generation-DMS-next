import { Spinner } from "@/core/Spinner"
import { useFindProjects } from "@/DMS/hooks/api/project/useFindProjects"
import { useApplicationState } from "@/hooks/state/useApplicationState"
import { NoProjects } from "@/page-components/control-panel/NoProjects"


export default function ControlPanel() {
  const { loggedInUser } = useApplicationState()
  const { data: projects, error, status } = useFindProjects({ userId: loggedInUser._id })

  if (status === 'loading') {
    return <Spinner />
  }

  if (projects.length === 0) {
    return <NoProjects />
  }

  return (
    <div>{JSON.stringify(projects, null, 2)}</div>
  )
}
