import { User } from '@prisma/client'
import { SWITCH_ORGANISATION_MUTATION } from 'graphql/mutations'
import { LOGGED_IN_USER_QUERY } from 'graphql/queries'
import { createContext, useContext, useMemo } from 'react'
import { MutationStatus } from 'types'
import { useMutation, useQuery } from 'graphql/hooks'

interface IProps {
  children: React.ReactNode
}

interface IAppValuesContext {
  switchingStatus: MutationStatus
}

interface IAppActionsContext {
  switchOrganisation: (data: Partial<User>) => void
}

const AppLayoutValuesContext = createContext<IAppValuesContext | undefined>(
  undefined,
)
const AppLayoutActionsContext = createContext<IAppActionsContext | undefined>(
  undefined,
)

export const useAppLayoutValuesContext = () => {
  const context = useContext(AppLayoutValuesContext)

  if (!context) {
    throw Error('You are using this component outside of AppLayoutContext')
  }

  return context
}

export const useAppLayoutActionsContext = () => {
  const context = useContext(AppLayoutActionsContext)

  if (!context) {
    throw Error(
      'You are using this component outside of AppLayoutActionsContext',
    )
  }

  return context
}

export const AppLayoutProvider = ({ children }: IProps) => {
  const { mutate } = useQuery({
    query: LOGGED_IN_USER_QUERY,
  })
  const [switchOrganisation, { status: switchingStatus }] = useMutation(
    SWITCH_ORGANISATION_MUTATION,
    mutate,
  )

  const values = useMemo(
    () => ({
      switchingStatus,
    }),
    [switchingStatus],
  )

  const actions = useMemo(
    () => ({
      switchOrganisation,
    }),
    [switchOrganisation],
  )

  return (
    <AppLayoutValuesContext.Provider value={values}>
      <AppLayoutActionsContext.Provider value={actions}>
        {children}
      </AppLayoutActionsContext.Provider>
    </AppLayoutValuesContext.Provider>
  )
}
