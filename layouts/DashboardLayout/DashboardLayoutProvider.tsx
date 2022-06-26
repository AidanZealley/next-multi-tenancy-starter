import { User } from '@prisma/client'
import { SWITCH_ORGANISATION_MUTATION } from 'graphql/mutations'
import { LOGGED_IN_USER_QUERY } from 'graphql/queries'
import { createContext, useContext, useMemo } from 'react'
import { MutationStatus } from 'types'
import { useMutation, useQuery } from 'graphql/hooks'

interface IProps {
  children: React.ReactNode
}

interface IDashboardValuesContext {
  switchingStatus: MutationStatus
}

interface IDashboardActionsContext {
  switchOrganisation: (data: Partial<User>) => void
}

const DashboardLayoutValuesContext = createContext<
  IDashboardValuesContext | undefined
>(undefined)
const DashboardLayoutActionsContext = createContext<
  IDashboardActionsContext | undefined
>(undefined)

export const useDashboardLayoutValuesContext = () => {
  const context = useContext(DashboardLayoutValuesContext)

  if (!context) {
    throw Error(
      'You are using this component outside of DashboardLayoutContext',
    )
  }

  return context
}

export const useDashboardLayoutActionsContext = () => {
  const context = useContext(DashboardLayoutActionsContext)

  if (!context) {
    throw Error(
      'You are using this component outside of DashboardLayoutActionsContext',
    )
  }

  return context
}

export const DashboardLayoutProvider = ({ children }: IProps) => {
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
    <DashboardLayoutValuesContext.Provider value={values}>
      <DashboardLayoutActionsContext.Provider value={actions}>
        {children}
      </DashboardLayoutActionsContext.Provider>
    </DashboardLayoutValuesContext.Provider>
  )
}
