import { Project } from '@/DMS/collections/project'
import { atomWithLocalStorage } from '@/hooks/state/atomWithLocalStorage'
import { atom, useAtom } from 'jotai'
import { User } from 'src/DMS/collections/user'
import { ServerStates } from 'src/types/application'


const userAtom = atom<User | null | undefined>(undefined as User)
const sideMenuOpenAtom = atom<boolean>(false)
const serverStateAtom = atom(ServerStates.loaded)

const selectedProjectAtom = atomWithLocalStorage('selected-project', null)

export const useApplicationState = () => {
  const [sideMenuOpen, setSideMenuOpen] = useAtom(sideMenuOpenAtom)
  const [loggedInUser, setLoggedInUser] = useAtom(userAtom)
  const [serverState, setServerState] = useAtom(serverStateAtom)

  // Local storage atom doesn't have types so we cast them
  const [_selectedProject, _setSelectedProject] = useAtom(selectedProjectAtom)
  const selectedProject = _selectedProject as Project
  const setSelectedProject = _setSelectedProject  as (newProject: Project) => void


  return {
    sideMenuOpen, setSideMenuOpen,
    loggedInUser, setLoggedInUser,
    serverState, setServerState,
    selectedProject, setSelectedProject
  }
}
