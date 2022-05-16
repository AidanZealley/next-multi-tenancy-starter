import { User } from '@prisma/client'
import { useSwitchOrganisationMutation } from 'lib/organisations/mutations'
import { useLoggedInUserQuery } from 'lib/users/queries'
import { createContext, useContext, useMemo } from 'react'
import { MutationStatusTypes } from 'utils/mutation-creators/types'

interface IProps {
  children: React.ReactNode
}

interface IDashboardValuesContext {
  switchingStatus: MutationStatusTypes,
}

interface IDashboardActionsContext {
  switchOrganisation: (data: Partial<User>) => void,
}

const DashboardLayoutValuesContext = createContext<IDashboardValuesContext | undefined>(undefined)
const DashboardLayoutActionsContext = createContext<IDashboardActionsContext | undefined>(undefined)

export const useDashboardLayoutValuesContext = () => {
  const context = useContext(DashboardLayoutValuesContext)

  if (!context) {
    throw Error('You are using this component outside of DashboardLayoutContext')
  }

  return context
}

export const useDashboardLayoutActionsContext = () => {
  const context = useContext(DashboardLayoutActionsContext)

  if (!context) {
    throw Error('You are using this component outside of DashboardLayoutActionsContext')
  }

  return context
}

export const DashboardLayoutProvider = ({ children }: IProps) => {
  const { mutate } = useLoggedInUserQuery()
  const { switchOrganisation, status: switchingStatus } = useSwitchOrganisationMutation(mutate)

  const values = useMemo(() => ({
    switchingStatus,
  }), [
    switchingStatus,
  ])
  
  const actions = useMemo(() => ({
    switchOrganisation,
  }), [
    switchOrganisation,
  ])

  return (
    <DashboardLayoutValuesContext.Provider value={values}>
      <DashboardLayoutActionsContext.Provider value={actions}>
        {children}
      </DashboardLayoutActionsContext.Provider>
    </DashboardLayoutValuesContext.Provider>
  )
}