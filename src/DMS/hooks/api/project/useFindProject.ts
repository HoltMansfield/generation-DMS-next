import { useQuery } from '@tanstack/react-query'
import { Project } from '../../../collections/project'
import { HttpError } from '../../../types/api'
import { useCollection } from '@/DMS/hooks/core/useCollection'
import { CacheTimes } from '@/types/application'


export const useFindProject = (query: object) => {
  const { findOne } = useCollection('projects')

  const _fetcher = async (): Promise<Project> => {
    const result = await findOne(query)
    return result as Project 
  }

  const { status, error, data } = useQuery<Project, HttpError>({
    queryKey: ['findProject', query],
    queryFn: _fetcher,
    staleTime: CacheTimes.hour_4
  })

  return {
    status, error, data
  } as const
}
