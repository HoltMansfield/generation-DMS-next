import { useQuery } from '@tanstack/react-query'
import { Project } from '../../../collections/project'
import { HttpError } from '../../../types/api'
import { useCollection } from '@/DMS/hooks/core/useCollection'


export const useFindProjects = (query: object) => {
  const { find } = useCollection('projects')

  const _fetcher = async (): Promise<Project[]> => {
    const result = await find(query)
    return result as Project[]
  }

  const { status, error, data } = useQuery<Project[], HttpError>({
    queryKey: ['findProjects'],
    queryFn: _fetcher,
    staleTime: 1000 * 60 * 60
  })

  return {
    status, error, data
  } as const
}
